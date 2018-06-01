import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon, Layout, Badge } from 'antd';
import { connect } from 'react-redux';
import '@/style/header.less';
import ModuleMenu from '@/components/ModuleMenu';
import { updateModule } from '@/reducers/app';
import { logout } from 'api';
import { removeToken } from '@/utils/token';
import FullScreen from '@/components/FullScreen';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MyHeader extends React.Component {
    updateModule = (e) => {
        let accesseMenu = this.props.accessMenu;
        let moduleList = accesseMenu.filter(item => {
            return item.leftMemu && item.name === e.key
        });
        let moduleMenu = moduleList[0].children;
        this.props.updateModule({
            currentModule: e.key,
            moduleMenu: moduleMenu
        });
    }
    menuClick = e => {
        e.key === 'logout' && this.logout();
    }
    logout = async () => {
        try {
            await logout();
        } catch (e) {

        }
        removeToken();
        this.props.history.push('/login')
    }
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }}>
                <ul className="top-nav" style={{ lineHeight: '65px', float: 'left',marginLeft:10 }}>
                    <li>
                        <div className="item" onClick={this.props.toggle}>
                            <Icon
                                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            />
                        </div>
                    </li>
                </ul>
                <ModuleMenu
                    style={{ lineHeight: '64px', float: 'left' }}
                    moduleList={this.props.moduleList}
                    updateModule={this.updateModule}
                    currentModule={this.props.currentModule}
                />

                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="full">
                        <FullScreen />
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item> */}
                    <SubMenu title={<span className="avatar"><img src={this.props.avatar} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.name}</Menu.Item>
                            <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout" />退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <ul className="top-nav" style={{ lineHeight: '65px', float: 'right' }}>
                    <li>
                        <a className="item" href="https://github.com/ant-design/ant-design/" target={"_blank"}>
                            <Icon type="github" />
                        </a>
                    </li>
                </ul>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.name,
        avatar: state.user.avatar,
        currentModule: state.app.currentModule,
        moduleList: state.app.moduleList,
        accessMenu: state.app.accessMenu
    }
};
const mapDispatchToProps = dispatch => {
    return {
        updateModule: (module) => {
            dispatch(updateModule(module));
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyHeader));
