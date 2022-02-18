# Serverless-Fun Template for NodeJs

## 简介
此项目为 Serverless Framework 在 Fun 环境下的 NodeJs 模板。

使用此模板您可以快速地使用 NodeJs 开发无服务器云函数。

## 快速入门
> 在此之前您需要拥有应用，[前往创建](https://accounts.dustlight.cn/clients/new) 或者 [选择应用](https://accounts.dustlight.cn/clients)。
> 
> 开发环境要求安装 NodeJs。

### 准备
安装 **Serverless Framework** ：

```npm install -g serverless```

克隆项目：

```git clone https://github.com/dustlight-cn/serverless-fun-nodejs-template.git```

### 安装依赖

在项目根目录执行：

```npm install```

### 配置应用密钥
在根目录创建 ```.env``` 文件，内容如下：
```
FUN_CLIENT_ID=<您的 ClientID>
FUN_CLIENT_SECRET=<您的 ClientSecret>
```


### 运行调试

在项目根目录执行：

```npm run dev```

打开浏览器，输入地址：

```http://localhost:3000/hello```

### 打包部署
在项目根目录执行：

```npm run deploy```

打开浏览器，输入地址：

```http://<ClientID>.fun.dustlight.cn/hello?xx=xx```


