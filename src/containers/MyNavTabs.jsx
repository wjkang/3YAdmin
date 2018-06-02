import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import MenuToRouter from '@/menuMapToRouter';
import util from '@/utils/util';

const TabPane = Tabs.TabPane;

class MyNavTabs extends React.Component {
  state = {
    currentPage: '',
    openPages: [{
      name: "home",
      title: "首页",
      path: "/app/home",
      closable: false
    }]
  }
  componentWillReceiveProps(nextProps) {
    console.log("MyNavTabs componentWillReceiveProps")
    let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === nextProps.location.pathname);
    if (name) {
      if (this.state.openPages.some(s => s.name === name)) {
        this.setState({
          currentPage: name
        });
      } else {
        let menu = util.getMenuByName(name, nextProps.accessMenu);
        if (menu.name) {
          let openPages = this.state.openPages;
          openPages.push({
            name: menu.name,
            title: menu.title,
            path: MenuToRouter[menu.name],
            closable: true
          });
          this.setState({
            openPages: openPages,
            currentPage: name
          });
        }
      }
    } else if (nextProps.location.pathname === "/app/home") {
      this.setState({
        currentPage: "home"
      })
    }
  }
  onTabClick = (activeKey) => {
    if (activeKey !== this.state.currentPage && activeKey === 'home') {
      this.props.history.push('/app/home');
      return;
    }
    if (activeKey !== this.state.currentPage) {
      this.props.history.push(MenuToRouter[activeKey]);
    }
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  remove = (targetKey) => {
    let activeKey = this.state.currentPage;
    let lastIndex;
    this.state.openPages.forEach((pane, i) => {
      if (pane.name === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.openPages.filter(pane => pane.name !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].name;
    }
    this.setState(
      {
        openPages: panes,
        currentPage: activeKey
      }
    );
    let path=this.state.openPages.filter(s=>s.name===activeKey)[0].path;
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        <Tabs
          hideAdd
          activeKey={this.state.currentPage}
          tabBarStyle={{ background: 'white', padding: 10, margin: 0, }}
          type="editable-card"
          onEdit={this.onEdit}
          onTabClick={this.onTabClick}
        >
          {this.state.openPages.map(page => <TabPane tab={page.title} closable={page.closable} key={page.name}></TabPane>)}
          {/* <TabPane closable={true} tab="Tab 1" key="1"></TabPane>
          <TabPane closable={true} tab="Tab 2" key="2"></TabPane>
          <TabPane closable={true} tab="Tab 3" key="3"></TabPane>
          <TabPane closable={true} tab="Tab 4" key="4"></TabPane>
          <TabPane closable={true} tab="Tab 5" key="5"></TabPane>
          <TabPane closable={true} tab="Tab 6" key="6"></TabPane>
          <TabPane closable={true} tab="Tab 7" key="7"></TabPane>
          <TabPane closable={true} tab="Tab 8" key="8"></TabPane>
          <TabPane closable={true} tab="Tab 9" key="9"></TabPane>
          <TabPane closable={true} tab="Tab 10" key="10"></TabPane>
          <TabPane closable={true} tab="Tab 11" key="11"></TabPane>
          <TabPane closable={true} tab="Tab 12" key="16"></TabPane>
          <TabPane closable={true} tab="Tab 22" key="25"></TabPane>
          <TabPane closable={true} tab="Tab 32" key="34"></TabPane>
          <TabPane closable={true} tab="Tab 42" key="43"></TabPane>
          <TabPane closable={true} tab="Tab 52" key="52"></TabPane>
          <TabPane closable={true} tab="Tab 62" key="61"></TabPane> */}
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    accessMenu: state.app.accessMenu
  }
}
export default withRouter(connect(mapStateToProps)(MyNavTabs));