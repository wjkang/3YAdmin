import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu';
import '@/style/menu.less';

const { Sider } = Layout;

class MySider extends Component {
    state = {
        openKey: '',
        selectedKey: '',
    }
    openMenu = v => {
        console.log(v[v.length - 1])
        this.setState({
            openKey: v[v.length - 1]
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
                <div className="logo"></div>
                <SiderMenu
                    menus={this.props.menus}
                    mode="inline"
                    onOpenChange={this.openMenu}
                />
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    return {
        menus: state.app.moduleMenu
    }
}

export default connect(mapStateToProps, null)(MySider);