import fs from 'fs-extra';
import path from 'path';
import { loadComponent } from '@serverless-devs/core';
import get from 'lodash.get';

const generateService = (serviceName: string) => {
  return {
    name: serviceName,
    description: 'Serverless Devs service',
  };
};

const generateFunction = (codeUri: string, functionName: string, ...reset: any) => {
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
  } = reset;
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

export const generateFcSpec = async (inputs) => {
  const { service, codeUri, functions } = get(inputs, 'props.faas', {});
  if (!functions) {
    const functionDir = path.join(process.cwd(), codeUri);
    if (!fs.ensureDir(functionDir)) {
      throw new Error(`${functionDir} is not exist`);
    }
    const functionPaths = fs.readdirSync(functionDir);

    if (functionPaths && functionPaths.length) {
      return Promise.all(
        functionPaths
          .filter((functionName) => functionName.indexOf('.js') > -1)
          .map(async (name) => {
            const { region } = inputs.props;
            const fcDeployFuncion = {
              region,
              service: generateService(service),
              function: generateFunction(codeUri, name.replace('.js', '')),
              triggers: generateHttpTriggers(),
            };
            const fcDeploy = await loadComponent('devsapp/fc-deploy');
            delete inputs.props;
            const result = await fcDeploy.deploy({
              props: fcDeployFuncion,
              ...inputs,
            });
            return [name, result];
          }),
      );
    }
  }
};
