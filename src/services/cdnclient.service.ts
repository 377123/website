/* eslint-disable no-console */
import Cdn20180510, * as $Cdn20180510 from '@alicloud/cdn20180510';
import * as $OpenApi from '@alicloud/openapi-client';
import { ICredentials, ICdnSource } from '../interface';
import { parseDomain } from '../utils';
import { CDN_ERRORS } from '../contants';
import get from 'lodash.get';

export default class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(credentials: ICredentials): Cdn20180510 {
    const { accessKeyId, accessKeySecret } = credentials;
    const config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'cdn.aliyuncs.com';
    return new Cdn20180510(config);
  }

  /**
   * 设置edge script灰度配置
   * @param accessKeyId
   * @param accessKeySecret
   */
  static async setEsStagingConfig(
    credentials: ICredentials,
    { domain, rule }: { domain: string; rule: string },
  ): Promise<any> {
    const client = Client.createClient(credentials);
    const setCdnDomainStagingConfigRequest = new $Cdn20180510.SetCdnDomainStagingConfigRequest({
      domainName: domain,
      functions: JSON.stringify([
        {
          functionArgs: [
            { argName: 'enable', argValue: 'on' },
            { argName: 'pri', argValue: '0' },
            { argName: 'name', argValue: 'serverless_dev_auto_es' },
            {
              argName: 'rule',
              argValue: rule,
            },
          ],
          functionName: 'edge_function',
        },
      ]),
    });
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.setCdnDomainStagingConfig(setCdnDomainStagingConfigRequest);
  }

  /**
   * 将edge script灰度配置发布到线上环境
   * @param credentials
   */
  static async publishEsStagingConfigToProduction(
    credentials: ICredentials,
    domain: string,
  ): Promise<void> {
    const client = Client.createClient(credentials);
    const publishStagingConfigToProductionRequest = new $Cdn20180510.PublishStagingConfigToProductionRequest(
      {
        domainName: domain,
        functionName: 'edge_function',
      },
    );
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.publishStagingConfigToProduction(
      publishStagingConfigToProductionRequest,
    );
  }

  /**
   * @description 获取CDN域名的详细信息
   * @param credentials
   */
  static async describeCdnDomainDetail(client, domain: string): Promise<any> {
    const { topDomain, rrDomainName } = parseDomain(domain);
    const describeCdnDomainDetailRequest = new $Cdn20180510.DescribeCdnDomainDetailRequest({
      domainName: `${rrDomainName}.${topDomain}`,
    });
    try {
      const result = await client.describeCdnDomainDetail(describeCdnDomainDetailRequest);
      const domainDetailMode = get(result, 'body.getDomainDetailModel');
      return domainDetailMode;
    } catch (error) {
      return null;
    }
  }

  /**
   * @description 域名归属校验
   * @param client
   * @param param1
   */
  static async verifyDomainOwner(
    client,
    { domain, verifyType = 'bothCheck' }: { domain: string; verifyType?: string },
  ) {
    const verifyDomainOwnerRequest = new $Cdn20180510.VerifyDomainOwnerRequest({
      domainName: domain,
      verifyType,
    });
    try {
      const result = await client.verifyDomainOwner(verifyDomainOwnerRequest);
      return result;
    } catch (error) {
      const describeVerifyContentRequest = new $Cdn20180510.DescribeVerifyContentRequest({
        domainName: domain,
      });
      const result = await client.describeVerifyContent(describeVerifyContentRequest);
      const verifyContent = get(result, 'body.content');
      throw new Error(
        `2020年6月12日起，当您首次将新域名添加至阿里云CDN时，需按要求做域名归属权验证，当您按要求配置DNS解析或文件验证后，才能正常调用AddCdnDomain接口添加域名。 域名归属权验证请参见https://help.aliyun.com/document_detail/169377.html
        请前往域名DNS服务商配置该TXT记录：记录类型:TXT，主机记录:verification，记录值:${verifyContent}
        `,
      );
    }
  }

  /**
   * 删除域名
   * @param client
   * @param domain
   */
  static async deleteCdnDomain(client, domain: string, isThrowError: boolean) {
    const deleteCdnDomainRequest = new $Cdn20180510.DeleteCdnDomainRequest({
      domainName: domain,
    });
    if (isThrowError) {
      try {
        await client.deleteCdnDomain(deleteCdnDomainRequest);
      } catch (error) {
        // ignore error
      }
    } else {
      await client.deleteCdnDomain(deleteCdnDomainRequest);
    }
  }

  /**
   * @description 添加CDN域名
   * @param client
   * @param param1
   */
  static async addCDNDomain(
    client,
    { domain, sources }: { domain: string; sources: ICdnSource },
  ): Promise<void> {
    const { topDomain, rrDomainName } = parseDomain(domain);
    // 添加CDN
    const addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
      cdnType: 'web', // 图片小文件
      domainName: `${rrDomainName}.${topDomain}`,
      sources: JSON.stringify([].concat(sources)),
    });
    try {
      const cdnResult = await client.addCdnDomain(addCdnDomainRequest);
      return cdnResult;
    } catch (error) {
      const message = get(error, 'message', '');
      const messageCode = message.split(':')[0];
      throw new Error(CDN_ERRORS[messageCode] || message);
    }
  }

  /**
   * @description 修改添加CDN域名
   * @param client
   * @param param1
   */
  static async modifyCdnDomain(
    client,
    { domain, sources }: { domain: string; sources?: ICdnSource },
  ): Promise<void> {
    const { topDomain, rrDomainName } = parseDomain(domain);
    // 修改源
    const addCdnDomainRequest = new $Cdn20180510.ModifyCdnDomainRequest({
      domainName: `${rrDomainName}.${topDomain}`,
      sources: JSON.stringify([].concat(sources)),
    });
    try {
      const cdnResult = await client.modifyCdnDomain(addCdnDomainRequest);
      return cdnResult;
    } catch (error) {
      const message = get(error, 'message', '');
      const messageCode = message.split(':')[0];
      throw new Error(CDN_ERRORS[messageCode] || message);
    }
  }

  /**
   * 添加加速域名
   * @param accessKeyId
   * @param accessKeySecret
   */
  // static async addCDNDomain(
  //   client,
  //   { domain, cdnSource, esRule }: { domain: string; cdnSource: ICdnSource; esRule?: string },
  // ): Promise<void> {
  //   const { topDomain, rrDomainName } = parseDomain(domain);

  //   // 添加CDN
  //   const addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
  //     cdnType: 'web', // 图片小文件
  //     domainName: `${rrDomainName}.${topDomain}`,
  //     sources: JSON.stringify([].concat(cdnSource)),
  //   });
  //   // 复制代码运行请自行打印 API 的返回值
  //   const cdnResult = await client.addCdnDomain(addCdnDomainRequest);
  //   console.log(cdnResult);
  //   // 添加到云解析DNS
  //   console.log(`域名${domain}添加到云解析DNS`);
  //   await DnsClient.addDomainRecord(credentials, {
  //     domainName: topDomain,
  //     RR: rrDomainName,
  //     type: 'CNAME',
  //     value: `${rrDomainName}.${topDomain}.w.alikunlun.com`,
  //   });
  //   if (esRule) {
  //     console.log('开始 edge script灰度配置');
  //     // 设置edge script灰度配置
  //     await Client.setEsStagingConfig(credentials, { domain, rule: esRule });
  //     console.log('edge script灰度配置发布到线上环境');
  //     // 将edge script灰度配置发布到线上环境
  //     await Client.publishEsStagingConfigToProduction(credentials, domain);
  //   }
  // }
}
