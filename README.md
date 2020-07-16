基于 typescript + react 的前端模板  

可以通过 github 的 issue 进行 bug 或者建议的反馈

# 安装

```bash
git clone git@github.com:LuHaikun/typescript-boilerplate.git

cd typescript-boilerplate/

npm install
```

修改 `package.json` 的 `name` 和 `version` 字段为项目需要的值

# 运行项目

## 运行开发环境

```bash
npm run dev
```

## 打包项目

```bash
// 开发环境
npm run build:development

// 测试环境
npm run build:testing

// 预生产环境
npm run build:preproduction

// 生产环境
npm run build:production
```

# 功能

* commit-msg 校验
* 动态路由加载
* 环境变量配置
* 基础信息存储
* 标签页切换
* 布局模式切换（固定顶部和侧边栏布局、固定头部的上中布局）
* 请求取消（路由切换时取消请求）
* 用户登录、登出
* 用户基本信息存储

# Bug

# Feature

* 请求权限
* 接口请求错误处理
* 标签页切换时保留切换前的界面
* 脚手架升级设计
* 拆分框架组件
* 使用ts