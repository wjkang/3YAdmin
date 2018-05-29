import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { updateModule } from '@/reducers/app';

class ModuleMenu extends React.Component {
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
    render() {
        const list = [];
        for (let item of this.props.moduleList) {
            list.push(
                <Menu.Item key={item.name}>
                    {item.title}
                </Menu.Item>
            );
        }
        return (
            <Menu
                onClick={this.updateModule}
                selectedKeys={[this.props.currentModule]}
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'left' }}
            >
                {list}
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentModule: state.app.currentModule,
        moduleList: state.app.moduleList,
        accessMenu: state.app.accessMenu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateModule: (module) => {
            dispatch(updateModule(module));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleMenu);
