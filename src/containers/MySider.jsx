import React from 'react';
import { connect } from 'react-redux';
import { updateModule } from '@/reducers/app';
import MySider from '@/components/MySider';
import MenuToRouter from '@/menuMapToRouter';
import util from '@/utils/util';

class MySiderContainer extends React.PureComponent {
    state = {
        openKeys: [],
        selectedKey: ''
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
                if (moduleList.length > 0) {
                    let moduleMenu = moduleList[0].children;
                    this.props.updateModule({
                        currentModule: currentModule,
                        moduleMenu: moduleMenu
                    });
                }
            }
            if (!this.props.collapsed) {//菜单收缩状态，回退或前进显示菜单 BUG
                this.setState({
                    openKeys: parentKeys
                });
            }

            this.setState({
                selectedKey: name
            });

        }
    }
    setOpenKeys = (collapsed) => {
        if (!collapsed) {
            this.setState({
                openKeys: [],
            });
        }
    }
    // menuClick = e => {
    //     this.setState({
    //         selectedKey: e.key
    //     });
    // };//不需要点击事件,切换路由的时候会触发initMenu,选中相应菜单
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
                // menuClick={this.menuClick}
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