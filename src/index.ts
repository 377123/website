import { HLogger, ILogger, getCredential, spinner } from '@serverless-devs/core';
import get from 'lodash.get';
import domain from './services/domain.service';
import env from './services/env.servece';
import oss, { IOssConfig } from './services/oss.services';
import { DEFAULT_SRC } from './contants';

export default class WebsiteComponent {
  @HLogger('WEBSITE') logger: ILogger;
  /**
   * 部署
   * @param inputs
   */
  async deploy(inputs: any) {
    const { projectName, access } = inputs.project;
    this.logger.debug(`[${projectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);
    const { AccessKeyID, AccessKeySecret } = await getCredential(access);
    const ossConfig: IOssConfig = {
      accessKeyId: get(inputs, 'Credentials.AccessKeyID', AccessKeyID),
      accessKeySecret: get(inputs, 'Credentials.AccessKeySecret', AccessKeySecret),
      bucket: get(inputs, 'props.bucket'),
      region: get(inputs, 'props.region'),
      src: get(inputs, 'props.src', DEFAULT_SRC),
      cors: get(inputs, 'props.cors'),
    };
    await env(inputs);
    await oss(ossConfig);
    spinner('OSS静态资源部署成功').succeed();
    // 挂载域名
    await domain(inputs);
  }

  async remove(inputs: any) {
    // 删除所有用到的资源以及配置等
    console.log(inputs);
  }
}
