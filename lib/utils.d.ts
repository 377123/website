import { IDomain, IReferer, ICertInfo, IIpFilter, RefererEnum, IpFilterEnum, IOptimization, IRedirects } from './interface';
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
    serverCertificateStatus: any;
    certName: string;
    serverCertificate: string;
    privateKey: string;
} | {
    certType: "csr";
    serverCertificateStatus: any;
    serverCertificate: string;
    certName?: undefined;
    privateKey?: undefined;
} | {
    certType: string;
    serverCertificateStatus: any;
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
export declare function parseRedirects(params: IRedirects[]): {
    functionName: string;
    functionArgs: {
        argName: string;
        argValue: string;
    }[];
}[];
export declare const waitUntil: ({ asyncService, stopCondition, timeout, timeInterval, desc, }: {
    asyncService: Promise<any>;
    stopCondition: (result: any) => boolean;
    timeInterval?: number;
    timeout?: number;
    desc: string;
}) => Promise<void>;
