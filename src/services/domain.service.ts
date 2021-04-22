import { loadComponent, Logger, spinner } from '@serverless-devs/core';
import cloneDeep from 'lodash.clonedeep';
import CdnService from './cdnclient.service';
import DnsService from './dnsclient.service';
import { ICdnSource, IDomainParams } from '../interface';
import { parseDomain, sleep } from '../utils';
import get from 'lodash.get';
import chillout from 'chillout';

const LOGCONTEXT = 'WEBSITE';
const TEN_MINUTE = 10 * 60 * 1000;
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
  const { access, https, optimization, redirects } = hostObj;
  // https 配置
  await CdnService.setDomainServerCertificate(cdnClient, { domain, https });
  // Referer 防盗链
  const referer = get(access, 'referer');
  if (referer) {
    await CdnService.setCdnDomainReferer(cdnClient, { domain, referer });
  }

  // IP黑/白名单
  const ipFilter = get(access, 'ipFilter');
  if (ipFilter) {
    await CdnService.setCdnDomainIpFilter(cdnClient, { domain, ipFilter });
  }

  // UA黑/白名单
  const uaFilter = get(access, 'uaFilter');
  if (uaFilter) {
    await CdnService.setCdnDomainUaFilter(cdnClient, { domain, uaFilter });
  }

  // 性能优化
  if (optimization) {
    await CdnService.setCdnDomainOptimization(cdnClient, { domain, optimization });
  }

  // 重定向
  if (redirects) {
    await CdnService.setCdnDomainRedirects(cdnClient, { domain, redirects });
  }
};

// 生成系统域名
const generateSystemDomain = async (params: IDomainParams): Promise<any> => {
  const { credentials, inputs } = params;
  const { props } = inputs;
  const domainConponent = await loadComponent(
    'devsapp/domain',
    'http://registry.serverlessfans.cn/simple',
  );
  const cdnClient = CdnService.createClient(credentials);
  // eslint-disable-next-line
  inputs.props = { ...props, type: 'oss' };

  const sysDomain = await domainConponent.get(inputs);
  Logger.debug(LOGCONTEXT, `系统域名:${sysDomain}`);

  /**
   * 修改证书前，查看域名是否配置成功
   */
  const startTime = new Date().getTime();
  const spin = spinner('系统域名配置中...');
  await chillout.waitUntil(async () => {
    await sleep(3000);
    const result = await CdnService.DescribeUserDomains(cdnClient, {
      domain: sysDomain,
      checkDomainShow: true,
    });
    if (new Date().getTime() - startTime > TEN_MINUTE) {
      Logger.debug('WEBSITE', '等待系统域名生效超时');
      spin.fail('系统域名配置失败');
      return chillout.StopIteration;
    }
    if (get(result, 'domainStatus') === 'online') {
      spin.succeed('系统域名配置成功');
      return chillout.StopIteration;
    }
  });

  await CdnService.setDomainServerCertificate(cdnClient, { domain: sysDomain });
};

// 绑定到自定义域名
const generateDomain = async (params: IDomainParams) => {
  const { credentials, hostObj, sources } = params;
  const { host: domain } = hostObj;
  const cdnClient = CdnService.createClient(credentials);
  const dnsClient = DnsService.createClient(credentials);
  const { topDomain, rrDomainName } = parseDomain(domain);

  const domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
  // 没有域名则添加域名
  if (!domainDetailMode) {
    Logger.debug(LOGCONTEXT, `首次绑定自定义域名:${domain}`);
    // 第一次添加会出强制校验
    await CdnService.verifyDomainOwner(cdnClient, { domain });
    await CdnService.addCDNDomain(cdnClient, {
      domain,
      sources,
    });

    const startTime = new Date().getTime();
    await chillout.waitUntil(async () => {
      await sleep(3000);
      const result = await CdnService.describeCdnDomainDetail(cdnClient, domain);
      if (new Date().getTime() - startTime > TEN_MINUTE) {
        Logger.debug('WEBSITE', '等待 DNS 首次配置生效超时');
        return chillout.StopIteration;
      }
      if (!!get(result, 'cname')) {
        return chillout.StopIteration;
      }
    });

    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
  } else {
    Logger.debug(LOGCONTEXT, `绑定自定义域名:${domain}`);
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
  if (hosts?.length > 0) {
    await Promise.all(
      hosts.map(async (hostObj) => {
        if (hostObj.host === 'auto') {
          await generateSystemDomain({ credentials, inputs, sources });
        } else {
          await generateDomain({ credentials, hostObj, sources });
        }
      }),
    );
  } else {
    Logger.log('如果需要系统帮你生成一个域名，可配置host为 auto ', 'blue');
  }
};
