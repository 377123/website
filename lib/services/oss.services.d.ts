interface ISrc {
    src: string;
    dist?: string;
    hook?: string;
    index: string;
    error: string;
}
interface ICors {
    allowedOrigin: string[];
    allowedMethod: string[];
}
export interface IOssConfig {
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    region: string;
    src: ISrc;
    cors: ICors;
}
declare const _default: (ossConfig: IOssConfig) => Promise<void>;
export default _default;
