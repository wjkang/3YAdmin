import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu';
import '@/style/menu.less';
import util from '@/utils/util';
import logo from '@/logo.svg';

const { Sider } = Layout;

class MySider extends Component {
    state = {
        openKeys: [],
        selectedKey: '',
    }
    componentWillMount() {
        let pathname=this.props.location.pathname;
        
    }
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        let parentKeys = util.getParentMenusByName(this.props.openAccessMenu, v[v.length - 1]).map(item => {
            return item.name;
        });
        this.setState({
            openKeys: parentKeys
        })
    };
    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth={this.props.responsive ? 0 : undefined}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" style={{ paddingLeft: this.props.collapsed ? '14px' : '6px' }}><img src={logo} /><h3>React Antd Admin</h3></div>
                <SiderMenu
                    menus={this.props.menus}
                    mode="inline"
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.openKeys}
                />
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    return {
        menus: state.app.moduleMenu,
        openAccessMenu: state.app.openAccessMenu
    }
}

export default withRouter(connect(mapStateToProps, null)(MySider));