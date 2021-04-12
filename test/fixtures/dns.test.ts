// import DnsService from '../../src/services/dnsclient.service';
// import credentials from '../credentials';

// const dnsClient = DnsService.createClient(credentials);

// DnsService.describeDomainInfo(dnsClient, 'hx3.dankunalijam.top');

// DnsService.addDomainRecord(dnsClient, {
//   domainName: 'raoxiaojing.top',
//   RR: 'dankun',
//   type: 'CNAME',
//   value: 'dankun.serverlessfans.com.w.alikunlun.com',
// });

import { load } from '@serverless-devs/core';

const abc = async () => {
  const pulumiComponentIns = await load('fc-base');
  console.log(pulumiComponentIns);
};
abc();
