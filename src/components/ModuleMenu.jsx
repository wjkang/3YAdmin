import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';

class ModuleMenu extends React.Component {
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
        currentModule:state.app.currentModule,
        moduleList:state.app.moduleList
    }
}

export default connect(mapStateToProps, null)(ModuleMenu);
