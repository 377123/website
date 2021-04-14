import OssClient from 'ali-oss';
import { spinner } from '@serverless-devs/core';
import path from 'path';
import fs from 'fs-extra';
import { PUT_BUCKET_CORS } from '../contants';
import walkSync from 'walk-sync';
import { spawnSync } from 'child_process';

interface ISrc {
  src: string;
  dist?: string;
  hook?: string;
  index: string;
  error: string;
}

interface ICors {
  allowedOrigin: string[];
  allowedMethod: string[];
}

export interface IOssConfig {
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  region: string;
  src: ISrc;
  cors: ICors;
}

export default async (ossConfig: IOssConfig) => {
  const { bucket, region, accessKeyId, accessKeySecret, src, cors } = ossConfig;
  if (src.hook) {
    await buildSpawnSync(src.hook, src.src);
  }
  // 构造oss客户端
  let ossClient = new OssClient({
    bucket,
    region: `oss-${region}`,
    accessKeyId,
    accessKeySecret,
  });

  // bucket, 不存在此bucket,则创建: 并且加上权限
  await getOrCreateBucket(ossClient, bucket);
  // region重新赋值
  const location = await ossClient.getBucketLocation(bucket);
  ossClient = new OssClient({
    bucket,
    region: location.location,
    accessKeyId,
    accessKeySecret,
  });
  // 文件上传
  await put(ossClient, src.dist || src.src);

  // 配置静态托管
  await ossClient.putBucketWebsite(bucket, { index: src.index, error: src.error });

  // 设置跨域资源共享规则
  if (cors) {
    await ossClient.putBucketCORS(bucket, [cors]);
  }
};

async function buildSpawnSync(hook: string, src: string) {
  const result = spawnSync(hook, [], {
    cwd: path.resolve(process.cwd(), src),
    stdio: 'inherit',
    shell: true,
  });
  if (result && result.status !== 0) {
    throw Error('> Execute Error');
  }
}

async function put(ossClient: OssClient, staticPath: string) {
  const paths = walkSync(staticPath);
  for (const p of paths) {
    const fillPath = path.resolve(staticPath, p);
    const stat = fs.statSync(fillPath);
    if (stat.isFile()) {
      const spin = spinner(`上传 ${p}`);
      try {
        await ossClient.put(p, fillPath);
        spin.succeed();
      } catch (error) {
        spin.fail();
        throw new Error(error.message);
      }
    }
  }
}

async function getOrCreateBucket(ossClient: OssClient, bucket: string) {
  try {
    await ossClient.getBucketInfo(bucket);
    // bucket存在，检查权限，且只能设置为 公共读
    const { acl } = await ossClient.getBucketACL(bucket);

    if (acl !== 'public-read') {
      await ossClient.putBucketACL(bucket, 'public-read');
    }
  } catch (error) {
    if (error.code == 'NoSuchBucket') {
      const vm = spinner(`Create ${bucket} bucket`);
      await ossClient.putBucket(bucket);
      await ossClient.putBucketACL(bucket, 'public-read');
      await ossClient.putBucketCORS(bucket, PUT_BUCKET_CORS);
      vm.succeed();
    } else {
      throw new Error(error.message);
    }
  }
}
