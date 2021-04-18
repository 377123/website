import { ILogger } from '@serverless-devs/core';
export default class WebsiteComponent {
    logger: ILogger;
    /**
     * 部署
     * @param inputs
     */
    deploy(inputs: any): Promise<void>;
    deployFunction(inputs: any): Promise<void>;
    remove(inputs: any): Promise<void>;
}
