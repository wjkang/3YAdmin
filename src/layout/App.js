import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Tabs } from 'antd';
import logo from '@/logo.svg';
import './App.css';
import MyHeader from '@/components/MyHeader';
import { getToken } from '@/utils/token';
import { getUserInfo, getAccessMemu } from 'api';
import { updateUserInfo } from '@/reducers/user';
import { updateAccessMenu } from '@/reducers/app';
import util from '@/utils/util';



const { Header, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

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
        <Sider
          breakpoint="lg"
          collapsedWidth={this.state.responsive ? 0 : undefined}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"></div>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab="Tab 1" key="1"></TabPane>
            <TabPane tab="Tab 2" key="2"></TabPane>
            <TabPane tab="Tab 3" key="3"></TabPane>
            <TabPane tab="Tab 4" key="4"></TabPane>
            <TabPane tab="Tab 5" key="5"></TabPane>
            <TabPane tab="Tab 6" key="6"></TabPane>
            <TabPane tab="Tab 7" key="7"></TabPane>
            <TabPane tab="Tab 8" key="8"></TabPane>
            <TabPane tab="Tab 9" key="9"></TabPane>
            <TabPane tab="Tab 10" key="10"></TabPane>
            <TabPane tab="Tab 11" key="11"></TabPane>
          </Tabs>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <MyHeader collapsed={this.state.collapsed} toggle={this.toggle}>
          </MyHeader>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Content
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
