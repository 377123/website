import { loadComponent } from '@serverless-devs/core';
import cloneDeep from 'lodash.clonedeep';
import CdnService from './cdnclient.service';
import DnsService from './dnsclient.service';
import { ICdnSource } from '../interface';
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

// 生成系统域名
const generateSystemDomain = async (credentials, inputs, sources: ICdnSource) => {
  const { Properties: props } = inputs;
  const domainConponent = await loadComponent('domain');
  const cdnClient = CdnService.createClient(credentials);
  // eslint-disable-next-line
  inputs.Properties = { ...props, type: 'oss' };

  const sysDomain = await domainConponent.get(inputs);
  const domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, sysDomain);
  if (domainDetailMode.domainStatus === 'online') {
    CdnService.modifyCdnDomain(cdnClient, { domain: sysDomain, sources });
  }
};

// 绑定到自定义域名
const generateDomain = async (credentials, inputs, sources: ICdnSource) => {
  const { domain } = get(inputs, 'Properties', {});
  const cdnClient = CdnService.createClient(credentials);
  const dnsClient = DnsService.createClient(credentials);
  // TODO: 先校验下域名状态
  let domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
  console.log(domain, domainDetailMode);
  const { topDomain, rrDomainName } = parseDomain(domain);

  // 没有域名则添加域名
  if (!domainDetailMode) {
    // 第一次添加会出强制校验
    await CdnService.verifyDomainOwner(cdnClient, { domain });
    await CdnService.deleteCdnDomain(cdnClient, domain, true);
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

    // TODO: 是否直接DNS解析还是提示出来？
    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
    // 配置CNAME后大约有10分钟延迟才会更新该列状态。如已按教程配置，请忽略该提示。如何配置？
  } else {
    // 运行中才能进行状态修改
    if (domainDetailMode.domainStatus === 'online') {
      // 暂时先覆盖操作
      CdnService.modifyCdnDomain(cdnClient, { domain, sources });
    }

    await DnsService.describeDomainInfo(dnsClient, topDomain);

    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
  }
};

export default async (orinalInputs) => {
  const inputs = cloneDeep(orinalInputs);
  const { Properties: props } = inputs;
  const sources = getCdnOssSources(get(props, 'region'), get(props, 'bucket'));
  const credentials = {
    accessKeyId: get(inputs, 'Credentials.AccessKeyID'),
    accessKeySecret: get(inputs, 'Credentials.AccessKeySecret'),
  };

  if (props.domain) {
    await generateDomain(credentials, inputs, sources);
  } else {
    await generateSystemDomain(credentials, inputs, sources);
  }
};
