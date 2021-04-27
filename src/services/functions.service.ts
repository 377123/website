import fs from 'fs-extra';
import path from 'path';
import { loadComponent, Logger } from '@serverless-devs/core';
import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';
import DnsService from './dnsclient.service';
import { parseDomain } from '../utils';

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

const generteCustomDomains = ({ functionName, domain, protocol }) => {
  // const prefix = protocol === 'http' ? 'http://' : 'https://';
  return [
    {
      domainName: domain,
      protocol: 'HTTP',
      routeConfigs: [
        {
          path: `/api/${functionName}`,
        },
      ],
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
              customDomains: generteCustomDomains({
                domain: hostObj.domain,
                protocol: get(hostObj, 'https.protocol', 'https'),
                functionName: name.replace('.js', ''),
              }),
            };
            const fcDeploy = await loadComponent('devsapp/fc-deploy');
            const deployParams = {
              ...inputs,
              props: fcDeployFuncion,
            };
            Logger.debug(
              'WEBSITE',
              `fc-deploy inputs params: ${JSON.stringify(deployParams, null, 2)}`,
            );
            const result = await fcDeploy.deploy(deployParams);
            const { region: curRegion, function: funcName } = result;
            const httpUrl = `${accountID}.${curRegion}.fc.aliyuncs.com/<version>/proxy/${service}/${funcName.name}/`;
            return { name, httpUrl };
          }),
      );
    }
  }
};

const addDomainRecord = async ({ credentials, domain }) => {
  const dnsClient = DnsService.createClient(credentials);
  const { topDomain, rrDomainName } = parseDomain(domain);
  await DnsService.addDomainRecord(dnsClient, {
    domainName: topDomain,
    RR: rrDomainName,
    type: 'CNAME',
    value: `${credentials.accountID}.cn-hangzhou.fc.aliyuncs.com`,
  });
};

export const generateFcSpec = async (orinalInputs) => {
  const inputs = cloneDeep(orinalInputs);
  const { props } = inputs;
  const { hosts } = props;
  const credentials = {
    accountID: get(inputs, 'Credentials.AccountID'),
    accessKeyId: get(inputs, 'Credentials.AccessKeyID'),
    accessKeySecret: get(inputs, 'Credentials.AccessKeySecret'),
  };

  if (hosts?.length > 0) {
    return await Promise.all(
      hosts.map(async (hostObj) => {
        if (hostObj.faas) {
          await addDomainRecord({ credentials, domain: hostObj.domain });
          return await deployFcFunction({ inputs, hostObj });
        }
      }),
    );
  }
};
