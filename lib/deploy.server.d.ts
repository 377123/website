interface IPages {
    index: string;
    error?: string;
}
interface ICors {
    allowedOrigin: string[];
    allowedMethod: string[];
}
interface IReferer {
    allowEmpty: boolean;
    referers: string[];
}
export interface IOssConfig {
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    region: string;
    staticPath: string;
    pages: IPages;
    cors: ICors;
    referer: IReferer;
}
declare const _default: (ossConfig: IOssConfig) => Promise<void>;
export default _default;
