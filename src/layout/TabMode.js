import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './TabMode.css';
import MyHeader from '@/containers/MyHeader';
import MySider from '@/containers/MySider';
import MyBreadcrumb from '@/containers/MyBreadcrumb';
import MyNavTabs from '@/containers/MyNavTabsR';
import { getToken } from '@/utils/token';
import { getUserInfo, getAccessMemu } from 'api';
import { updateUserInfo } from '@/reducers/user';
import { updateAccessMenu } from '@/reducers/app';
import util from '@/utils/util';
import AppRouters from '@/routers/AppRouters';






const { Content } = Layout;

class TabMode extends Component {
    state = {
        collapsed: false,
        responsive: false,
        navTabShow: true,
        navTabTop: 65
    }
    componentWillMount() {
        console.log("App componentWillMount")
    }
    componentDidMount() {
        this.initAppData();//数据初始化完后再触发一次render
        this.getClientWidth();//判断屏幕尺寸再触发一次render(不需要可去掉)
        window.onresize = () => {
            this.getClientWidth();
        }
        console.log("App componentDidMount");
    }
    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.initChildData(nextProps)
        }
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const clientWidth = document.body.clientWidth;
        this.setState({
            responsive: clientWidth <= 992,
            collapsed: clientWidth <= 992
        });
        if (clientWidth < 576) {
            this.setState({
                navTabTop: 193
            });
            return;
        }
        if (clientWidth < 768) {
            this.setState({
                navTabTop: 129
            });
            return;
        }
        if (clientWidth >= 768) {
            this.setState({
                navTabTop: 65
            });
            return;
        }
    }
    toggle = () => {
        this.refs['MySider'].wrappedInstance.setOpenKeys(this.state.collapsed);//https://github.com/ant-design/ant-design/issues/8911
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    toggleNavTab = () => {
        this.setState({ navTabShow: !this.state.navTabShow });
    }
    initAppData = async () => { //获取用户信息,菜单,权限列表(整个应用就一种layout布局,App就是相当母版页,不必在AuthrizedRoute里每次路由跳转的时候判断是否需要获取,是否登录也在此处判断)
        //没有登录，跳转到登录界面，并记下当前路径
        let token = getToken();
        if (!token) {
            this.props.history.push('/login');
            return;
        }
        let [infoRes, menuRes] = await Promise.all([getUserInfo(), getAccessMemu()]);
        console.log("initAppData start");
        let permission = [...infoRes.data.userRole, ...infoRes.data.userPermission];
        let isAdmin = infoRes.data.isAdmin;
        let userInfo = {
            name: infoRes.data.userName,
            avatar: infoRes.data.avatarUrl,
            isAdmin: isAdmin,
            permission: permission
        }
        localStorage.setItem("permission", JSON.stringify(permission));
        localStorage.setItem("isAdmin", isAdmin);
        let openAccesseMenu = util.openAccesseMenu(menuRes.data);
        let moduleList = menuRes.data.filter(item => {
            return item.leftMemu
        });
        let currentModule = moduleList[0].name;
        let moduleMenu = moduleList[0].children;
        this.props.updateAccessMenu({
            currentModule: currentModule,
            accessMenu: menuRes.data,
            openAccessMenu: openAccesseMenu,
            moduleMenu: moduleMenu,
            moduleList: moduleList
        });
        this.props.updateUserInfo(userInfo);
        this.initChildData(this.props);
        console.log("initAppData end")
    }
    initChildData(props) {
        this.refs['MySider'].wrappedInstance.initMenu(props.location.pathname);
    }
    render() {
        console.log("App render");
        return (
            <Layout>
                <MySider
                    ref={'MySider'}
                    responsive={this.state.responsive}
                    collapsed={this.state.collapsed}
                >
                </MySider>
                <Layout>
                    <MyHeader collapsed={this.state.collapsed} toggle={this.toggle} toggleNavTab={this.toggleNavTab} navTabshow={this.state.navTabShow}>
                    </MyHeader>
                    {/* <MyBreadcrumb style={{ padding: '10px 10px 10px 17px', background: 'rgb(250, 250, 250)', marginTop: this.state.navTabTop + 59 + (this.state.navTabShow ? 0 : -59) }} /> */}
                    <Content style={{ padding: 24,paddingTop:0, background: '#fff' }}>
                    <MyNavTabs style={{ marginTop: this.state.navTabTop,width: '100%', display: this.state.navTabShow ? 'block' : 'none' }} show={this.state.navTabShow}/>
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
export default connect(mapStateToPorps, mapDispatchToProps)(TabMode);
