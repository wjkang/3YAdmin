
## 3YAdmin
&emsp;&emsp;[3YAdmin](https://github.com/wjkang/3YAdmin)是一个专注通用权限控制与表单的后台管理系统模板。

&emsp;&emsp;3YAdmin支持两种布局模式，Tab模式和正常模式。两种模式是webpack打包编译时确定的，打包某个模式时不会引入另外一种模式下的多余代码(React 实现Tab模式比较蛋疼)。

&emsp;&emsp;3YAdmin实现了RBAC权限控制模型的核心功能页面和操作。

&emsp;&emsp;3YAdmin通过解析定义好的JSON数据，可以生成查询表单，静态表单，动态表单。

&emsp;&emsp;搭配[lazy-mock](https://github.com/wjkang/lazy-mock) 可以快速生成前后端带mock数据的增删改查功能(简单的代码生成器)。

[![](https://ci.appveyor.com/api/projects/status/github/wjkang/3YAdmin?branch=master&svg=true)]()
[![react](https://img.shields.io/badge/react-16.3.2-brightgreen.svg)](https://github.com/facebook/react/)
[![antd](https://img.shields.io/badge/antd-3.5.3-brightgreen.svg)](https://github.com/ant-design/ant-design)
[![axios](https://img.shields.io/badge/axios-0.18.0-brightgreen.svg)](https://github.com/axios/axios)
[![redux](https://img.shields.io/badge/redux-4.0.0-brightgreen.svg)](https://github.com/reduxjs/redux)
[![react-router-dom](https://img.shields.io/badge/react--router--dom-4.2.2-brightgreen.svg)](https://github.com/axios/axios)
[![MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)]()

online demo:

[Tab Mode](http://jaycewu.coding.me/3YAdmin-preview)    

[Common Mode](http://jaycewu.coding.me/3YAdmin-preview-common)

登录账号:

    admin 123

    test 123456

    website_admin 123456


## 功能与特点

- 真实后端数据支持
- 登录/登出
- 收缩左侧菜单栏
- 响应式布局
- 按需加载
- Tag标签导航
- 面包屑
- 全屏/退出全屏
- 动态菜单与静态菜单
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
- 例子
    - 权限测试页
    - 错误页
    - JSON表单(通过解析JSON数据,动态生成表单)
        - Search Form(查询表单)
        - Common Form(静态表单,解析第一次后,JSON数据改变后表单不会跟着变)
        - Dynamic Form(动态表单,JSON数据改变后表单重新生成)


## 安装使用

## Install
```bush
git clone https://github.com/wjkang/3YAdmin.git

npm install
```

安装后台mock服务
```bush
git clone -b 3YAdmin https://github.com/wjkang/quasar-admin-server.git

npm install

npm start
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

## 配置

直接将react-react-app生成的配置复制出来进行修改，都在react-scripts文件夹下，当前配置了antd按需引入，分chunk打包以及使用了AutoDllPlugin。可以按照自己的需要进行修改。

打包模式的配置需修改buils.js与start.js文件中的process.env.REACT_APP_LAYOUT_MODE

## 使用教程

后面会出详细使用教程以及前后端分离的后台管理系统前端架构设计思路(包含vue和react)，喜欢的话可以给个star。

## 效果展示

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/1.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/2.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/3.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/4.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/5.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/6.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/7.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/8.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/9.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/10.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/11.jpg)

![image](https://raw.githubusercontent.com/wjkang/3YAdmin/master/screenshot/12.jpg)
