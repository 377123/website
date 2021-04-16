## 高级配置

### env

serverless 部署时会将 `env` 下配置的参数写入 `env.js` 文件中，将该文件打包上传到 `publishDir` 指定目录。

比如配置了:

```yaml
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
      region: cn-hangzhou
      env: 
        API_URL: https://api.com
      hosts:
        - host: auto
          
```

那么静态项目根目录下生成的 `env.js` 文件内容如下：

```js
window.env = {
  API_URL = 'https://api.com'
}
```

然后，我们可以在前端项目中给所有的请求 URL 添加 `window.env.API_URL` 前缀，通常在全栈应用中，会使用到。比如在部署完后端服务后会生产后端服务网关 `url`，然后我们将上面的的 `API_URL` 赋值为后端服务的 `url`，就可以做到无需手动引入修改接口链接了。具体使用请参考 [全栈应用案例](https://github.com/serverless-components/tencent-examples/tree/master/fullstack)

###  buildCommand

serverless cli 支持配置 `buildCommand` 配置来帮用户执行部署前的命令，比如前端项目需要通过 `npm run build` 命令构建，然后才会部署，那么可以配置如下：

```yaml
edition: 1.0.0
services:
  websiteProject:
    component: website
    access: default
    props:
      bucket: bucket-demo
      src:
        codeUri: ./
        publishDir: ./build
        buildCommand: npm run build
      region: cn-hangzhou
      env: 
        API_URL: https://api.com
      hosts:
        - host: auto
```

- **buildCommand**: 指定部署前需要执行的命令
