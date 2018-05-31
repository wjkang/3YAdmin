import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateModule } from '@/reducers/app';
import MySider from '@/components/MySider';
import MenuToRouter from '@/menuMapToRouter';
import util from '@/utils/util';

class MySiderContainer extends Component {
    state = {
        openKeys: [],
        selectedKey: ''
    }
    componentWillMount() {
        console.log("MySider componentWillMount")
    }
    componentDidMount() {

        console.log("MySider componentDidMount")
    }
    componentWillUpdate() {
        console.log("MySider componentWillUpdate")
    }
    componentDidUpdate() {
        console.log("MySider componentDidUpdate")
    }
    componentWillReceiveProps(nextProps) {//componentWillMount,componentDidMount都未获取到openAccessMenu,因为openAccessMenu是在App的componentDidMount里异步获取的
        console.log("MySider componentWillReceiveProps")
        //刷新页面会触发三次，第一次为store初始化,第二次为openAccessMenu更新，第三次为MySider render导致App render,然后又再次触发(App render导致其子组件的componentWillReceiveProps会触发，但是不会死循环)
        // if (nextProps.openAccessMenu.length === 0) {//store初始化触发的忽略掉
        //     return;
        // }
        // if(this.props.openAccessMenu.length>0)//第三次触发忽略掉（不能忽略）
        // {
        //    return;
        // }
        // let pathname = nextProps.location.pathname;
        // let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
        // if (name) {
        //     let parentKeys = util.getParentMenusByName(nextProps.openAccessMenu, name).map(item => {
        //         return item.name;
        //     });
        //     if (parentKeys.length > 0) {
        //         let currentModule = parentKeys[0];
        //         let accessMenu = nextProps.accessMenu;
        //         let moduleList = accessMenu.filter(item => {
        //             return item.leftMemu && item.name === currentModule
        //         });
        //         let moduleMenu = moduleList[0].children;
        //         this.props.updateModule({
        //             currentModule: currentModule,
        //             moduleMenu: moduleMenu
        //         });
        //     }
        //     this.setState({
        //         openKeys: parentKeys
        //     });
        //     this.setState({
        //         selectedKey: name
        //     });
        // }
    }

    initMenu = (pathname) => {
        let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
        if (name) {
            let parentKeys = util.getParentMenusByName(this.props.openAccessMenu, name).map(item => {
                return item.name;
            });
            if (parentKeys.length > 0) {
                let currentModule = parentKeys[0];
                let accessMenu = this.props.accessMenu;
                let moduleList = accessMenu.filter(item => {
                    return item.leftMemu && item.name === currentModule
                });
                let moduleMenu = moduleList[0].children;
                this.props.updateModule({
                    currentModule: currentModule,
                    moduleMenu: moduleMenu
                });
            }
            this.setState({
                openKeys: parentKeys
            });
            this.setState({
                selectedKey: name
            });
        }
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
        console.log("MySider render");
        return (
            <MySider
                responsive={this.props.responsive}
                collapsed={this.props.collapsed}
                menus={this.props.menus}
                menuClick={this.menuClick}
                openMenu={this.openMenu}
                selectedKey={this.state.selectedKey}
                openKeys={this.state.openKeys}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        menus: state.app.moduleMenu,
        openAccessMenu: state.app.openAccessMenu,
        accessMenu: state.app.accessMenu,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateModule: (module) => {
            dispatch(updateModule(module));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MySiderContainer);