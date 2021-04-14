import { loadComponent } from '@serverless-devs/core';
import cloneDeep from 'lodash.clonedeep';
import CdnService from './cdnclient.service';
import DnsService from './dnsclient.service';
import { ICdnSource, IDomainParams } from '../interface';
import { parseDomain, sleep } from '../utils';
import chillout from 'chillout';
import get from 'lodash.get';

/**
 * OSS 源站
 * @param region
 * @param bucket
 * @returns
 */
const getCdnOssSources = (region: string, bucket: string): ICdnSource => {
  return {
    content: `${bucket}.oss-${region}.aliyuncs.com`,
    type: 'oss',
    port: 80,
  };
};

const setDomainAdvancedConfig = async (cdnClient, { domain, hostObj }) => {
  const { access, https } = hostObj;
  // https 配置
  if (https) {
    await CdnService.setDomainServerCertificate(cdnClient, { domain, https });
  }
  // referer 防盗链
  const referer = get(access, 'referer');
  if (referer) {
    await CdnService.setCdnDomainReferer(cdnClient, { domain, referer });
  }
};

// 生成系统域名
const generateSystemDomain = async (params: IDomainParams): Promise<any> => {
  const { credentials, inputs, sources } = params;
  const { props } = inputs;
  const domainConponent = await loadComponent('domain');
  const cdnClient = CdnService.createClient(credentials);
  // eslint-disable-next-line
  inputs.props = { ...props, type: 'oss' };

  const sysDomain = await domainConponent.get(inputs);

  CdnService.modifyCdnDomain(cdnClient, { domain: sysDomain, sources });

  await CdnService.setDomainServerCertificate(cdnClient, { domain: sysDomain });
};

// 绑定到自定义域名
const generateDomain = async (params: IDomainParams) => {
  const { credentials, hostObj, sources } = params;
  const { host: domain } = hostObj;
  const cdnClient = CdnService.createClient(credentials);
  const dnsClient = DnsService.createClient(credentials);
  const { topDomain, rrDomainName } = parseDomain(domain);

  let domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
  // 没有域名则添加域名
  if (!domainDetailMode) {
    // 第一次添加会出强制校验
    await CdnService.verifyDomainOwner(cdnClient, { domain });
    await CdnService.addCDNDomain(cdnClient, {
      domain,
      sources,
    });
    await chillout.waitUntil(async () => {
      let isStop = false;
      while (!isStop) {
        await sleep(350);
        domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
        isStop = !!domainDetailMode.cname;
        if (isStop) {
          return chillout.StopIteration;
        }
      }
    });

    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
  } else {
    CdnService.modifyCdnDomain(cdnClient, { domain, sources });
  }
  await setDomainAdvancedConfig(cdnClient, { domain, hostObj });
};

export default async (orinalInputs) => {
  const inputs = cloneDeep(orinalInputs);
  const { props } = inputs;
  const sources = getCdnOssSources(get(props, 'region'), get(props, 'bucket'));
  const credentials = {
    accessKeyId: get(inputs, 'Credentials.AccessKeyID'),
    accessKeySecret: get(inputs, 'Credentials.AccessKeySecret'),
  };
  const { hosts } = props;
  if (hosts) {
    await Promise.all(
      hosts.map(async (hostObj) => {
        await generateDomain({ credentials, hostObj, sources });
      }),
    );
  } else {
    await generateSystemDomain({ credentials, inputs, sources });
  }
};
