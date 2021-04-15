import { ILogger } from '@serverless-devs/core';
export default class WebsiteComponent {
    logger: ILogger;
    /**
     * 部署
     * @param inputs
     */
    deploy(inputs: any): any;
    remove(inputs: any): any;
}
