import { IDomain } from './interface';

export const parseDomain = (domain: string): IDomain => {
  const [first, second, thrid] = domain.split('.');
  if (!thrid) {
    return {
      topDomain: `${first}.${second}`,
      rrDomainName: null,
    };
  } else {
    return {
      topDomain: `${second}.${thrid}`,
      rrDomainName: first,
    };
  }
};

export function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
