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
const generateSystemDomain = async (credentials, inputs, sources: ICdnSource): Promise<any> => {
  const { props } = inputs;
  const domainConponent = await loadComponent('domain');
  const cdnClient = CdnService.createClient(credentials);
  // eslint-disable-next-line
  inputs.props = { ...props, type: 'oss' };

  const sysDomain = await domainConponent.get(inputs);
  const domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, sysDomain);
  if (domainDetailMode.domainStatus === 'online') {
    CdnService.modifyCdnDomain(cdnClient, { domain: sysDomain, sources });
  }
  await CdnService.setDomainServerCertificate(cdnClient, { domain: sysDomain });
};

// 绑定到自定义域名
const generateDomain = async (credentials, hosts, sources: ICdnSource) => {
  const { host: domain } = hosts;
  const cdnClient = CdnService.createClient(credentials);
  const dnsClient = DnsService.createClient(credentials);
  const { topDomain, rrDomainName } = parseDomain(domain);
  // 验证主域存在
  await DnsService.describeDomainInfo(dnsClient, topDomain);

  let domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
  console.log(domainDetailMode);
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
    // eslint-disable-next-line no-lonely-if
    if (domainDetailMode.domainStatus === 'online') {
      // 暂时先覆盖操作
      CdnService.modifyCdnDomain(cdnClient, { domain, sources });
    } else {
      await DnsService.addDomainRecord(dnsClient, {
        domainName: topDomain,
        RR: rrDomainName,
        type: 'CNAME',
        value: domainDetailMode.cname,
      });
      CdnService.modifyCdnDomain(cdnClient, { domain, sources });
    }
  }
  if (domainDetailMode.serverCertificateStatus !== 'on') {
    await CdnService.setDomainServerCertificate(cdnClient, { domain });
  }
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
      hosts.map(async (host) => {
        await generateDomain(credentials, host, sources);
      }),
    );
  } else {
    await generateSystemDomain(credentials, inputs, sources);
  }
};
