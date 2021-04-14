import { IDomain, IReferer, ICertInfo } from './interface';

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
  const { refererType, allowEmpty, referers } = params;
  if (refererType === 'whitelist') {
    return {
      functionName: 'referer_white_list_set',
      functionArgs: [
        {
          argName: 'allow_empty',
          argValue: allowEmpty ? 'on' : 'off',
        },
        {
          argName: 'refer_domain_allow_list',
          argValue: referers.join(','),
        },
      ],
    };
  } else {
    return {
      functionName: 'referer_black_list_set',
      functionArgs: [
        {
          argName: 'allow_empty',
          argValue: allowEmpty ? 'on' : 'off',
        },
        {
          argName: 'refer_domain_deny_list',
          argValue: referers.join(','),
        },
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
}

export enum ForceHttpsEnum {
  off = 'http_force',
  on = 'https_force',
}

// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
