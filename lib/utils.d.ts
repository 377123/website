import { IDomain, IReferer, ICertInfo, IIpFilter, RefererEnum, IpFilterEnum, IOptimization } from './interface';
export declare const parseDomain: (domain: string) => IDomain;
export declare function sleep(msec: any): Promise<unknown>;
export declare function parseReferer(params: IReferer): {
    functionName: RefererEnum;
    functionArgs: {
        argName: string;
        argValue: string;
    }[];
};
export declare function parseIpFilter(params: IIpFilter): {
    functionName: IpFilterEnum;
    functionArgs: {
        argName: string;
        argValue: string;
    }[];
};
export declare function parseUaFilter(params: IIpFilter): {
    functionName: string;
    functionArgs: {
        argName: string;
        argValue: string;
    }[];
};
export declare function parseCertInfo(params: ICertInfo): {
    certType: "upload";
    serverCertificateStatus: "on" | "off";
    certName: string;
    serverCertificate: string;
    privateKey: string;
} | {
    certType: "csr";
    serverCertificateStatus: "on" | "off";
    serverCertificate: string;
    certName?: undefined;
    privateKey?: undefined;
} | {
    certType: string;
    serverCertificateStatus: string;
    certName?: undefined;
    serverCertificate?: undefined;
    privateKey?: undefined;
};
export declare function parseOptimization(params: IOptimization): {
    functionName: string;
    functionArgs: {
        argName: string;
        argValue: any;
    }[];
}[];
