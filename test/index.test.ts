import { load } from '@serverless-devs/core';

const abc = async () => {
  const pulumiComponentIns = await load('web-express');
  console.log(pulumiComponentIns);
};
abc();
