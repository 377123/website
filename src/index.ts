import { HLogger, ILogger, spinner, reportComponent } from '@serverless-devs/core';
import get from 'lodash.get';
import domain from './services/domain.service';
import env from './services/env.servece';
import oss, { IOssConfig } from './services/oss.services';
import { DEFAULT_SRC } from './contants';
import { generateFcSpec } from './services/functions.service';

export default class WebsiteComponent {
  @HLogger('WEBSITE') logger: ILogger;
  /**
   * 部署
   * @param inputs
   */
  async deploy(inputs: any) {
    const credentials = get(inputs, 'credentials', {});
    await reportComponent('website', {
      uid: credentials.AccountID,
      command: 'deploy',
    });
    this.logger.debug(
      `[${get(inputs, 'project.projectName')}] inputs params: ${JSON.stringify(inputs, null, 2)}`,
    );
    const ossConfig: IOssConfig = {
      accessKeyId: credentials.AccessKeyID,
      accessKeySecret: credentials.AccessKeySecret,
      bucket: get(inputs, 'props.bucket'),
      region: get(inputs, 'props.region'),
      src: get(inputs, 'props.src', DEFAULT_SRC),
      cors: get(inputs, 'props.cors'),
    };
    await env(inputs);
    await oss(ossConfig);
    spinner('OSS静态资源部署成功').succeed();
    // 挂载域名
    const domainInputs = await domain(inputs);
    await this.deployFunction({ ...inputs, ...domainInputs });
  }

  async deployFunction(inputs: any) {
    this.logger.debug(`deployFunction inputs params: ${JSON.stringify(inputs, null, 2)}`);

    const result = await generateFcSpec(inputs);
    this.logger.debug(`deployFunction result: ${JSON.stringify(result, null, 2)}`);
  }
  async remove(inputs: any) {
    // 删除所有用到的资源以及配置等
    console.log(JSON.stringify(inputs));
  }
}
