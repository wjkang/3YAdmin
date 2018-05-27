import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Tabs } from 'antd';
import logo from '@/logo.svg';
import './App.css';

const { Header, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
  state = {
    collapsed: false,
    responsive:false
  }
  componentWillMount() {
    this.getClientWidth();
    window.onresize = () => {
        this.getClientWidth();
    }
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
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth={this.state.responsive?0:undefined}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
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
export default connect(mapStateToPorps, null)(App);;
