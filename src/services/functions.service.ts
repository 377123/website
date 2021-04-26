import fs from 'fs-extra';
import path from 'path';
import { loadComponent, Logger } from '@serverless-devs/core';
import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';

const generateService = (serviceName: string) => {
  return {
    name: serviceName,
    description: 'Serverless Devs service',
  };
};

const generateFunction = (codeUri: string, functionName: string, ...rest: any) => {
  const {
    description,
    runtime,
    initializer,
    handler,
    memorySize,
    timeout,
    initializationTimeout,
    instanceConcurrency,
    instanceType,
  } = rest;
  return {
    codeUri,
    name: functionName,
    description,
    runtime: runtime || 'nodejs12',
    handler: handler || `${functionName}.handler`,
    memorySize: memorySize || 128,
    timeout: timeout || 60,
    initializationTimeout: initializationTimeout || 60,
    initializer,
    instanceConcurrency: instanceConcurrency || 1,
    instanceType: instanceType || 'e1',
  };
};

const generateHttpTriggers = (config?: any) => {
  return [
    {
      name: 'httpTrigger',
      type: 'http',
      config: Object.assign(
        {
          authType: 'anonymous',
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        },
        config || {},
      ),
    },
  ];
};

const deployFcFunction = async ({ inputs, hostObj }) => {
  const { props } = inputs;
  const accountID = get(inputs, 'Credentials.AccountID');
  const { service, codeUri, functions } = hostObj.faas;
  if (!functions) {
    const functionDir = path.join(process.cwd(), codeUri);

    if (!fs.ensureDir(functionDir)) {
      throw new Error(`${functionDir} is not exist`);
    }
    const functionPaths = fs.readdirSync(functionDir);

    if (functionPaths?.length > 0) {
      return Promise.all(
        functionPaths
          .filter((functionName) => functionName.endsWith('.js'))
          .map(async (name) => {
            const { region } = props;
            const fcDeployFuncion = {
              region,
              service: generateService(service),
              function: generateFunction(codeUri, name.replace('.js', '')),
              triggers: generateHttpTriggers(),
            };
            Logger.debug(
              'WEBSITE',
              `devsapp/fc-deploy 调用 deploy方法入参fcDeployFuncion: ${JSON.stringify(
                fcDeployFuncion,
                null,
                2,
              )}`,
            );
            const fcDeploy = await loadComponent('devsapp/fc-deploy');
            delete inputs.props;
            const result = await fcDeploy.deploy({
              props: fcDeployFuncion,
              ...inputs,
            });
            const { region: curRegion, function: funcName } = result;
            Logger.debug(
              'WEBSITE',
              `devsapp/fc-deploy 调用 deploy方法返回的result: ${JSON.stringify(result, null, 2)}`,
            );

            const httpUrl = `${accountID}.${curRegion}.fc.aliyuncs.com/<version>/proxy/${service}/${funcName.name}/`;
            return { name, httpUrl };
          }),
      );
    }
  }
};

export const generateFcSpec = async (orinalInputs) => {
  const inputs = cloneDeep(orinalInputs);
  const { props } = inputs;
  const { hosts } = props;

  if (hosts?.length > 0) {
    return await Promise.all(
      hosts.map(async (hostObj) => {
        if (hostObj.faas) {
          return await deployFcFunction({ inputs, hostObj });
        }
      }),
    );
  }
};
