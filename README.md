
## 3YAdmin
&emsp;&emsp;[3YAdmin](http://jaycewu.coding.me/vue-quasar-admin)是一个专注通用权限控制与表单的后台管理系统模板。

[![](https://ci.appveyor.com/api/projects/status/github/wjkang/3YAdmin?branch=master&svg=true)]()
[![react](https://img.shields.io/badge/react-16.3.2-brightgreen.svg)](https://github.com/facebook/react/)
[![antd](https://img.shields.io/badge/antd-3.5.3-brightgreen.svg)](https://github.com/ant-design/ant-design)
[![axios](https://img.shields.io/badge/axios-0.18.0-brightgreen.svg)](https://github.com/axios/axios)
[![redux](https://img.shields.io/badge/redux-4.0.0-brightgreen.svg)](https://github.com/reduxjs/redux)
[![react-router-dom](https://img.shields.io/badge/react--router--dom-4.2.2-brightgreen.svg)](https://github.com/axios/axios)
[![MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)]()

[online demo ](http://jaycewu.coding.me/3YAdmin-preview)

登录账号:

    admin 123

    test 123456

    website_admin 123456


## 功能与特点

- 真实后端数据支持
- 登录/登出
- 收缩左侧菜单栏
- tag标签导航
- 面包屑
- 全屏/退出全屏
- 动态菜单
- 菜单按模块划分
- 通用权限控制
    - 菜单级权限控制
    - 接口级权限控制
    - 元素级权限控制
- 全局可配置loading效果
- 网络异常处理
- 模块
    - 系统模块
        - 系统设置
            - 菜单管理
        - 权限管理
            - 功能管理
            - 角色管理
            - 角色权限管理
            - 角色用户管理
            - 用户角色管理
        - 组织架构
            - 部门管理
            - 职位管理
        - 用户管理 
    - 审计日志
    - 数据初始化

## 文件结构
```shell
.
├── .quasar  Quasar CLI生成的配置
└── src
    ├── assets  资源文件
    ├── components 自定义组件
    ├── css 样式文件
    ├── layout 布局组件
    ├── libs  工具方法
    ├── router  路由配置
    ├── store  状态管理
    ├── service  API管理
    ├── plugins  需要全局注册的组件、指令、插件
    └── pages
        ├── cms 
        │   └── 文章管理
        ├── develop
        │   ├── 官方组件
        │   └── 业务组件
        ├── organization
        │   ├── 部门管理
        │   └── 职位管理
        ├── other
        │   └── 审计日志
        ├── permission
        │   ├── 功能管理
        │   ├── 角色管理
        │   ├── 角色权限管理 
        │   ├── 角色用户管理
        │   └── 用户角色管理
        ├── system  
        │   ├── 菜单管理
        ├── user  
        │   └── 用户管理
        ├── 403 无权限页面
        ├── index 首页
        └── login 登录页
        
```

## 安装使用

## Install
```bush
npm install
```
## Run
### Development
```bush
npm start
```
### Production(Build)
```bush
npm run build
```

### 安装后台程序


[后台程序](https://github.com/wjkang/quasar-admin-server)

```bush
git clone https://github.com/wjkang/quasar-admin-server.git
```

## Install
```bush
npm install
```
## Run
### Development
```bush
npm run start
```
### Production(Build)
```bush
npm run production
```
后端程序使用[koa2](https://github.com/koajs/koa)构建，并且使用[lowdb](https://github.com/typicode/lowdb)持久化数据到JSON文件(使用JSON文件存储是为了快速构建demo)。

## 功能开发步骤（以文章管理为例）
- 前端
    - 定义功能码：
    - post_view  -文章列表查看
    - post_edit -文章编辑
    - post_del  -文章删除
    - 新建文章列表页  post.vue
    - 新增路由
    - 使用菜单管理功能新增"文章管理"的相关菜单，菜单名称必须与上一步新增的路由的name字段一致。权限码填定义好的"文章列表查看"功能对应的权限码（菜单级权限控制）
    - 使用功能管理在新建的菜单下录入定义好的功能名称及功能码
    - 配置角色与用户
    - 在角色权限管理为相应的角色设置功能权限
- 后端
    - db.json文件新增文章存储结构
    - services下新增postService.js,编写对db.json文件的操作
    - controllers下新增post.js,引入postService.js做相关操作
    - main-routes.js 增加相关路由,使用PermissionCheck中间件进行后端接口级的权限控制(可使用功能码或角色码)
- 前端
    - service下新增post.js，配置API相关操作，配置loading字段实现自定义loading效果，permission字段可配置功能编码与角色编码（实现前端接口级权限控制）
    - 回到post.vue文件，引入API访问文件，编写业务代码
    - 使用v-permission指令控制页面元素的是否显示，可使用功能编码与角色编码（实现元素级权限控制）
    - store app模块下配置dontCache，控制页面是否缓存
    
可多细节可查看源码

## 效果展示

