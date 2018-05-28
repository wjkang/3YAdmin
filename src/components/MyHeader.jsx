import React from 'react';
import { Menu, Icon, Layout, Badge} from 'antd';
import { connect } from 'react-redux';
import '@/style/header.less';
import ModuleMenu from './ModuleMenu';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MyHeader extends React.Component {
    menuClick = e => {
        e.key === 'logout' && this.logout();
    }
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    }
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                    style={{float: 'left' }}
                />
                <ModuleMenu />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="full">
                        <Icon type="arrows-alt" />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={this.props.avatar} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.name}</Menu.Item>
                            <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout" />退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
               
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { name, avatar } = state.user;
    return { name, avatar };
};

export default connect(mapStateToProps)(MyHeader);
