import { loadComponent, Logger, modifyProps } from '@serverless-devs/core';
import cloneDeep from 'lodash.clonedeep';
import CdnService from './cdnclient.service';
import DnsService from './dnsclient.service';
import { ICdnSource, IDomainParams } from '../interface';
import { parseDomain, waitUntil } from '../utils';
import get from 'lodash.get';

const LOGCONTEXT = 'WEBSITE';
const FIVE_MINUTE = 60 * 60 * 5;
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
  await modifyProps(
    get(inputs, 'project.projectName'),
    {
      hosts: props.hosts.map((item) => {
        return item.host === 'auto' ? { ...item, host: sysDomain } : item;
      }),
    },
    get(inputs, 'path.configPath'),
  );

  /**
   * 修改证书前，看cname是否生效
   */
  await waitUntil({
    asyncService: CdnService.describeCdnDomainDetail(cdnClient, sysDomain),
    stopCondition: (result) => !!result.cname,
    timeout: FIVE_MINUTE,
    desc: '系统域名生效',
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
    await waitUntil({
      asyncService: CdnService.describeCdnDomainDetail(cdnClient, domain),
      stopCondition: (result) => !!result.cname,
      desc: 'DNS 首次配置生效',
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
