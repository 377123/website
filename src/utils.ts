import {
  IDomain,
  IReferer,
  ICertInfo,
  IIpFilter,
  RefererEnum,
  IpFilterEnum,
  IOptimization,
} from './interface';
import get from 'lodash.get';

export const parseDomain = (domain: string): IDomain => {
  const arr = domain.split('.');
  return {
    topDomain: arr.slice(arr.length - 2).join('.'),
    rrDomainName: arr.slice(0, arr.length - 2).join('.'),
  };
};

export function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export function parseReferer(params: IReferer) {
  const { type, allowEmpty, rules } = params;
  if (type === 'whitelist') {
    return {
      functionName: RefererEnum.whitelist,
      functionArgs: [
        {
          argName: 'allow_empty',
          argValue: allowEmpty ? 'on' : 'off',
        },
        {
          argName: 'refer_domain_allow_list',
          argValue: rules.join(','),
        },
      ],
    };
  } else {
    return {
      functionName: RefererEnum.blacklist,
      functionArgs: [
        {
          argName: 'allow_empty',
          argValue: allowEmpty ? 'on' : 'off',
        },
        {
          argName: 'refer_domain_deny_list',
          argValue: rules.join(','),
        },
      ],
    };
  }
}

export function parseIpFilter(params: IIpFilter) {
  const { type, rules } = params;
  if (type === 'whitelist') {
    return {
      functionName: IpFilterEnum.whitelist,
      functionArgs: [
        {
          argName: 'ip_list',
          argValue: rules.join(','),
        },
      ],
    };
  } else {
    return {
      functionName: IpFilterEnum.blacklist,
      functionArgs: [
        {
          argName: 'ip_list',
          argValue: rules.join(','),
        },
      ],
    };
  }
}

export function parseUaFilter(params: IIpFilter) {
  const { type, rules } = params;
  if (type === 'whitelist') {
    return {
      functionName: 'ali_ua',
      functionArgs: [
        {
          argName: 'ua',
          argValue: rules.join('|'),
        },
        { argName: 'type', argValue: 'white' },
      ],
    };
  } else {
    return {
      functionName: 'ali_ua',
      functionArgs: [
        {
          argName: 'ua',
          argValue: rules.join('|'),
        },
        { argName: 'type', argValue: 'black' },
      ],
    };
  }
}

export function parseCertInfo(params: ICertInfo) {
  if (params.certType === 'free') {
    return {
      certType: params.certType,
      serverCertificateStatus: params.switch,
    };
  }

  if (params.certType === 'upload') {
    return {
      certType: params.certType,
      serverCertificateStatus: params.switch,
      certName: params.certName,
      serverCertificate: params.serverCertificate,
      privateKey: params.privateKey,
    };
  }

  if (params.certType === 'csr') {
    return {
      certType: params.certType,
      serverCertificateStatus: params.switch,
      serverCertificate: params.serverCertificate,
    };
  }
  return {
    certType: 'free',
    serverCertificateStatus: 'on',
  };
}

export function parseOptimization(params: IOptimization) {
  return [
    {
      functionName: 'tesla',
      functionArgs: [
        { argName: 'enable', argValue: get(params, 'trim.html', 'off') },
        { argName: 'trim_css', argValue: get(params, 'trim.css', 'off') },
        { argName: 'trim_js', argValue: get(params, 'trim.javascript', 'off') },
      ],
    },
    {
      functionName: 'gzip',
      functionArgs: [{ argName: 'enable', argValue: get(params, 'gzip', 'off') }],
    },
    {
      functionName: 'brotli',
      functionArgs: [
        { argName: 'enable', argValue: get(params, 'brotli', 'off') },
        { argName: 'brotli_level', argValue: '1' },
      ],
    },
  ];
}

// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
