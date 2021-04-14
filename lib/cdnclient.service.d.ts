import Cdn20180510 from '@alicloud/cdn20180510';
import { ICredentials, ICdnSource } from './interface';
export default class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(credentials: ICredentials): Cdn20180510;
    /**
     * 设置edge script灰度配置
     * @param accessKeyId
     * @param accessKeySecret
     */
    static setEsStagingConfig(credentials: ICredentials, { domain, rule }: {
        domain: string;
        rule: string;
    }): Promise<any>;
    /**
     * 将edge script灰度配置发布到线上环境
     * @param credentials
     */
    static publishEsStagingConfigToProduction(credentials: ICredentials, domain: string): Promise<void>;
    /**
     * @description 获取CDN域名的详细信息
     * @param credentials
     */
    static describeCdnDomainDetail(client: any, domain: string): Promise<any>;
    /**
     * @description 域名归属校验
     * @param client
     * @param param1
     */
    static verifyDomainOwner(client: any, { domain, verifyType }: {
        domain: string;
        verifyType?: string;
    }): Promise<any>;
    /**
     * 删除域名
     * @param client
     * @param domain
     */
    static deleteCdnDomain(client: any, domain: string, isThrowError: boolean): Promise<void>;
    /**
     * @description 添加CDN域名
     * @param client
     * @param param1
     */
    static addCDNDomain(client: any, { domain, sources }: {
        domain: string;
        sources: ICdnSource;
    }): Promise<void>;
    /**
     * @description 修改添加CDN域名
     * @param client
     * @param param1
     */
    static modifyCdnDomain(client: any, { domain, sources }: {
        domain: string;
        sources?: ICdnSource;
    }): Promise<void>;
}
