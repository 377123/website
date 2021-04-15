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

export interface ICertInfo {
  switch: 'on' | 'off';
  certType: 'free' | 'upload' | 'csr';
  certName?: string;
  serverCertificate?: string;
  privateKey?: string;
}

export type TForceHttps = 'on' | 'off' | 'default';
export type THttp2 = 'on' | 'off';
export interface IHttps {
  certInfo: ICertInfo;
  http2?: 'on' | 'off';
  forceHttps?: TForceHttps;
}

export interface IReferer {
  refererType: 'blacklist' | 'whitelist';
  allowEmpty: boolean;
  referers: string[];
}

export interface IIpFilter {
  ipType: 'blacklist' | 'whitelist';
  ips: string[];
}

export enum ForceHttpsEnum {
  off = 'http_force',
  on = 'https_force',
}

export enum RefererEnum {
  whitelist = 'referer_white_list_set',
  blacklist = 'referer_black_list_set',
}

export enum IpFilterEnum {
  whitelist = 'ip_allow_list_set',
  blacklist = 'ip_black_list_set',
}
