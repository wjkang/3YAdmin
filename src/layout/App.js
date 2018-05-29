import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './App.css';
import MyHeader from '@/components/MyHeader';
import MySider from '@/components/MySider';
import { getToken } from '@/utils/token';
import { getUserInfo, getAccessMemu } from 'api';
import { updateUserInfo } from '@/reducers/user';
import { updateAccessMenu } from '@/reducers/app';
import util from '@/utils/util';
import AppRouters from '@/routers/AppRouters';



const { Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    responsive: false
  }
  componentWillMount() {
    this.initAppData();
    this.getClientWidth();
    window.onresize = () => {
      this.getClientWidth();
    }
  }
  componentDidMount() {
    console.log("done");
  }
  getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
    const clientWidth = document.body.clientWidth;
    this.setState({
      responsive: clientWidth <= 992,
      collapsed: clientWidth <= 992
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  initAppData = async () => { //获取用户信息,菜单,权限列表(整个应用就一种layout布局,App就是相当母版页,不必在AuthrizedRoute里每次路由跳转的时候判断是否需要获取,是否登录也在此处判断)
    //没有登录，跳转到登录界面，并记下当前路径
    let token = getToken();
    if (!token) {
      this.props.history.push('/login');
      return;
    }
    let [infoRes, menuRes] = await Promise.all([getUserInfo(), getAccessMemu()]);
    let userInfo = {
      name: infoRes.data.userName,
      avatar: infoRes.data.avatarUrl,
      isAdmin: infoRes.data.isAdmin,
      permission: [...infoRes.data.userRole, ...infoRes.data.userPermission]
    }
    let openAccesseMenu = util.openAccesseMenu(menuRes.data);
    let moduleList = menuRes.data.filter(item => {
      return item.leftMemu
    });
    let currentModule = moduleList[0].name;
    let moduleMenu = moduleList[0].children;
    this.props.updateUserInfo(userInfo);
    this.props.updateAccessMenu({
      currentModule: currentModule,
      accessMenu: menuRes.data,
      openAccessMenu: openAccesseMenu,
      moduleMenu: moduleMenu,
      moduleList: moduleList
    });
  }
  render() {
    console.log("render");
    return (
      <Layout>
        <MySider
          responsive={this.state.responsive}
          collapsed={this.state.collapsed}
        >
        </MySider>
        <Layout>
          <MyHeader collapsed={this.state.collapsed} toggle={this.toggle}>
          </MyHeader>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <AppRouters />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToPorps = state => {
  const { name } = state.user;
  return { name };
};
const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: (info) => {
      dispatch(updateUserInfo(info))
    },
    updateAccessMenu: (accessMenu) => {
      dispatch(updateAccessMenu(accessMenu))
    }
  }
}
export default connect(mapStateToPorps, mapDispatchToProps)(App);
