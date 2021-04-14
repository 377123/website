import fs from 'fs';
import { get, isEmpty } from 'lodash';
import { DEFAULT_SRC } from '../contants';

export default async (inputs: any) => {
  const env = get(inputs, 'props.env', {});
  if (isEmpty(env)) return;
  const src = get(inputs, 'props.src', DEFAULT_SRC);
  const str = `window.env = ${JSON.stringify(env, null, 2)};`;
  await fs.writeFileSync(`${src.dist || src.src}/env.js`, str);
};
