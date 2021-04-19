# 配置文档

## 全量参数

```yml
# s.yml
edition: 1.0.0
services:
  websiteProject:
    component: website
    access: default
    props:
      bucket: your bucket
      src:
        codeUri: ./
        publishDir: ./build
        buildCommand: npm run build
        index: index.html
        error: index.html
      region: cn-hangzhou
      env:
        API_URL: https://api.com
      cors:
        - allowedOrigin: '*'
          allowedMethod:
            - GET
            - POST
            - PUT
            - DELETE
            - HEAD
          allowedHeader: allowedHeader
          exposeHeader: exposeHeader
          maxAgeSeconds: 0
      hosts:
        - host: your domain
          https:
            certInfo:
              switch: on
              certType: free # free upload
              certName: my-cert # certType为upload，需要传递该参数
              serverCertificate: 'your serverCertificate' # certType为upload，需要传递该参数
              privateKey: 'your privateKey' # certType为upload，需要传递该参数
            http2: off # on off
            protocol: https # on off default
          access:
            referer:
              switch: off
              type: whitelist
              allowEmpty: true
              rules:
                - 'aliyun.com'
                - 'taobao.com'
            ipFilter:
              switch: off
              type: whitelist
              rules:
                - '127.0.0.0/24'
                - '127.0.0.0/25'
            uaFilter:
              switch: off
              type: whitelist
              rules:
                - 'IE'
                - '*chrome*'
          optimization:
            trim:
              html: off
              css: on
              javascript: off
            gzip: off
            brotli: off
```

## 配置描述

主要参数描述

| 参数名称 | 必选 | 类型            |    默认值     | 描述                                                                                      |
| -------- | :--: | :-------------- | :-----------: | :---------------------------------------------------------------------------------------- |
| src      |  是  | [Src](#Src)[]   |               | 该项目的代码信息，参数参考执行目录                                                        |
| bucket   |  是  | string          |               | Bucket 名称。 不允许大写字母。如果你不加 AppId 后缀，则默认自动会为你加上。               |
| region   |  否  | string          | `cn-hangzhou` | 代码上传所在的 cos 区域。区。                                                             |
| env      |  否  | [Env](#Env)     |               | 环境变量参数文件。会将 env 下配置的参数写入 env.js 文件中，将该文件打包上传到你的代码里。 |
| cors     |  否  | [Cors](#Cors)[] |               | 跨域访问配置                                                                              |
| hosts    |  否  | [Cdn](#Cdn)[]   |               | CND 加速域名配置                                                                          |

### Src

执行目录

| 参数名称     | 必选 | 类型   |    默认值    | 描述                                 |
| ------------ | :--: | :----- | :----------: | :----------------------------------- |
| codeUri      |  否  | string |     `./`     | 你构建的项目代码目录。               |
| publishDir   |  是  | string |              | 钩子脚本执行构建后，输出的目录。     |
| buildCommand |  否  | string |              | 钩子脚本。在你项目代码上传之前执行。 |
| index        |  否  | string | `index.html` | 网站 index 页面                      |
| error        |  否  | string | `error.html` | 网站 error 页面                      |

### Cors

跨域配置

| 参数          | 必选 | 类型     | Description                                                                                |
| ------------- | :--: | :------- | :----------------------------------------------------------------------------------------- |
| allowedMethod |  是  | string[] | 允许的 HTTP 操作，枚举值：GET，PUT，HEAD，POST，DELETE                                     |
| allowedOrigin |  是  | string[] | 允许的访问来源，支持通配符`*`，格式为：`协议://域名[:端口]`，例如：`http://www.aliyun.com` |
| allowedHeader |  否  | string[] | 指定允许跨域请求的响应头，支持通配符`*`                                                    |
| exposeHeader  |  否  | string[] | 指定允许用户从应用程序中访问的响应头，不允许使用通配符`*`                                  |
| maxAgeSeconds |  否  | string[] | 指定浏览器对特定资源的预取（OPTIONS）请求返回结果的缓存时间。                              |

### Cdn

CDN 配置

| 参数名称     | 必选 | 类型                                                            | 默认 | 描述                  |
| ------------ | :--: | :-------------------------------------------------------------- | ---- | --------------------- |
| host         |  是  | string                                                          |      | 需要接入的 CDN 域名。 |
| https        |  否  | [Https](https://cloud.tencent.com/document/api/228/30987#Https) |      | Https 加速配置        |
| access       |  否  | [Access](#Access)                                               |      | 访问控制              |
| optimization |  否  | [Optimization](#Optimization)                                   |      | 性能优化              |

##### Https

| 参数名称 | 必选 | 类型                           | 默认             | 描述                                                 |
| -------- | :--: | :----------------------------- | ---------------- | ---------------------------------------------------- |
| certInfo |  否  | [CertInfo](#CertInfo)          | 默认使用免费证书 | HTTPS 证书                                           |
| http2    |  否  | 'on' \| 'off'                  | 'off'            | HTTP/2 是最新的 HTTP 协议，提高了资源访问效率。      |
| protocol |  否  | 'http' \| 'https' \| 'default' | 'https'          | 选择“default”时，同时支持 HTTP 和 HTTPS 方式的请求。 |

###### CertInfo

| 参数名称          | 必选 | 类型               | 默认   | 描述                                                         |
| ----------------- | :--: | :----------------- | ------ | ------------------------------------------------------------ |
| switch            |  否  | 'on' \| 'off'      | 'on'   | 是否开启 HTTPS 证书                                          |
| certType          |  否  | 'free' \| 'upload' | 'free' | 证书类型                                                     |
| certName          |  否  | string             |        | 证书名称                                                     |
| serverCertificate |  否  | string             |        | 安全证书内容，不启用证书则无需输入，配置证书请输入证书内容。 |
| certName          |  否  | string             |        | 私钥内容，不启用证书则无需输入，配置证书请输入私钥内容       |

##### Access

| 参数名称 | 必选 | 类型                  | 默认 | 描述           |
| -------- | :--: | :-------------------- | ---- | -------------- |
| referer  |  否  | [Referer](#Referer)   |      | Referer 防盗链 |
| ipFilter |  否  | [ipFilter](#ipFilter) |      | IP 黑/白名单   |
| uaFilter |  否  | [ipFilter](#uaFilter) |      | UA 黑/白名单   |

###### Referer

| 参数名称   | 必选 | 类型                       | 默认 | 描述                                       |
| ---------- | :--: | :------------------------- | ---- | ------------------------------------------ |
| switch     |  是  | 'on' \| 'off'              |      | Referer 防盗链配置开关                     |
| type       |  是  | 'blacklist' \| 'whitelist' |      | 类型，whitelist：白名单，blacklist：黑名单 |
| allowEmpty |  否  | boolean                    |      | 是否允许通过浏览器地址栏直接访问资源 URL   |
| rules      |  是  | string[]                   |      | 规则，黑白名单列表                         |

###### ipFilter

| 参数名称 | 必选 | 类型                       | 默认 | 描述                                       |
| -------- | :--: | :------------------------- | ---- | ------------------------------------------ |
| switch   |  是  | 'on' \| 'off'              |      | IP 黑白名单配置开关                        |
| type     |  是  | 'blacklist' \| 'whitelist' |      | 类型，whitelist：白名单，blacklist：黑名单 |
| rules    |  是  | string[]                   |      | 规则，黑白名单列表                         |

###### uaFilter

| 参数名称 | 必选 | 类型                       | 默认 | 描述                                       |
| -------- | :--: | :------------------------- | ---- | ------------------------------------------ |
| switch   |  是  | 'on' \| 'off'              |      | UA 黑白名单配置开关                        |
| type     |  是  | 'blacklist' \| 'whitelist' |      | 类型，whitelist：白名单，blacklist：黑名单 |
| rules    |  是  | string[]                   |      | 规则，黑白名单列表                         |

#### Optimization

| 参数名称 | 必选 | 类型          | 默认  | 描述                                                                                                      |
| -------- | :--: | :------------ | ----- | --------------------------------------------------------------------------------------------------------- |
| trim     |  否  | [Trim](#Trim) |       | 去除 HTML 页面冗余内容如注释以及重复的空白符，若源站文件自身有 md5 值校验机制，请勿开启此功能。           |
| gzip     |  否  | 'on' \| 'off' | 'off' | 对静态文件类型进行 Gzip 压缩，有效减少用户传输内容大小，若源站文件自身有 md5 值校验机制，请勿开启此功能。 |
| brotli   |  否  | 'on' \| 'off' | 'off' | 对 html、js、css 等文本文件进行 Brotli 压缩。当 brotli 和 gzip 同时开启时，优先选择 Brotli 压缩。         |

###### Trim

| 参数名称   | 必选 | 类型          | 默认  | 描述            |
| ---------- | :--: | :------------ | ----- | --------------- |
| html       |  是  | 'on' \| 'off' | 'off' | HTML 优化       |
| css        |  是  | 'on' \| 'off' | 'off' | CSS 优化        |
| javascript |  是  | 'on' \| 'off' | 'off' | JavaScript 优化 |

### Env

环境变量参数。serverless 部署时会将 `env` 下配置的参数写入 `env.js` 文件中，将该文件打包上传到 `publishDir` 指定目录。

比如配置了:

```yaml
env:
  API_URL: https://api.com
```

那么静态项目根目录下生成的 `env.js` 文件内容如下：

```js
window.env = {
  API_URL = 'https://api.com'
}
```

然后，我们可以在前端项目中给所有的请求 URL 添加 `window.env.API_URL` 前缀，通常在全栈应用中，会使用到。比如在部署完后端服务后会生产后端服务网关 `url`，然后我们将上面的的 `API_URL` 赋值为后端服务的 `url`，就可以做到无需手动引入修改接口链接了。具体使用请参考 [全栈应用案例](https://github.com/serverless-components/tencent-examples/tree/master/fullstack)
