import OssClient from 'ali-oss';
interface ISrc {
    src: string;
    dist?: string;
    hook?: string;
    index: string;
    error: string;
}
export interface IOssConfig {
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    region: string;
    src: ISrc;
    cors: OssClient.CORSRule[];
}
declare const _default: (ossConfig: IOssConfig) => any;
export default _default;
