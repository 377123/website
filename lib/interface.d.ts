export interface ICredentials {
    accessKeyId: string;
    accessKeySecret: string;
}
export interface IDomain {
    topDomain: string;
    rrDomainName: string;
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
export declare type TForceHttps = 'on' | 'off' | 'default';
export declare type THttp2 = 'on' | 'off';
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
