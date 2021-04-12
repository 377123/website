import { HLogger, ILogger, getCredential, spinner } from '@serverless-devs/core';
import get from 'lodash.get';
import domain from './services/domain.service';
import oss, { IOssConfig } from './services/oss.services';

export default class JamStackComponent {
  @HLogger('WEBSITE') logger: ILogger;
  async deploy(inputs: any) {
    const { ProjectName, AccessAlias } = inputs.Project;
    this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);
    const { AccessKeyID, AccessKeySecret } = await getCredential(AccessAlias);
    const ossConfig: IOssConfig = {
      accessKeyId: get(inputs, 'Credentials.AccessKeyID', AccessKeyID),
      accessKeySecret: get(inputs, 'Credentials.AccessKeySecret', AccessKeySecret),
      bucket: get(inputs, 'Properties.bucket'),
      region: get(inputs, 'Properties.region'),
      staticPath: get(inputs, 'Properties.staticPath', 'build'),
      pages: get(inputs, 'Properties.pages', { index: 'index.html' }),
      cors: get(inputs, 'Properties.cors'),
      referer: get(inputs, 'Properties.referer', { allowEmpty: true, referers: [] }),
    };
    try {
      await oss(ossConfig);
      spinner('OSS静态资源部署成功').succeed();
      // 分配自动域名
      await domain(inputs);
    } catch (error) {
      this.logger.log(`ERROR: ${error.message}`, 'red');
      this.logger.error(error.stack);
    }
  }

  async remove(inputs: any) {
    // 删除所有用到的资源以及配置等
    console.log(inputs);
  }
}
