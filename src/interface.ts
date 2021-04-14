export interface ICredentials {
  accessKeyId: string;
  accessKeySecret: string;
}

export interface IDomain {
  topDomain: string; // 一级域名
  rrDomainName: string; // 二级域名名称
}

export interface ICdnSource {
  content: string;
  type: 'oss' | 'ipaddr' | 'domain' | 'fc_domain';
  port: number;
}

export interface IDomainParams {
  credentials: ICredentials;
  sources: ICdnSource;
  [key: string]: any;
}

export type TSwitch = 'on' | 'off';

export interface ICertInfo {
  switch: TSwitch;
  certType: 'free' | 'upload' | 'csr';
  certName: string;
  serverCertificate: string;
  privateKey: string;
}
export interface IHttps {
  certInfo: ICertInfo;
  http2: TSwitch;
  forceHttps: TSwitch;
}

export interface IReferer {
  refererType: 'blacklist' | 'whitelist';
  allowEmpty: boolean;
  referers: string[];
}
