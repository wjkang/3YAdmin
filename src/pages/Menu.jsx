import React from 'react';
import { Card, Icon, Avatar, Row, Col, Tree } from 'antd';
import { getAllMenu, saveMenu } from 'api';

const TreeNode = Tree.TreeNode;
const { Meta } = Card;

class Menu extends React.Component {
    state = {
        menuList: [],
        tempMenu: {

        }
    }
    componentDidMount() {
        console.log(111)
        this.initData();
    }
    initData = async () => {
        let menuListRes = await getAllMenu();
        let menuList = menuListRes.data;
        this.setState({
            menuList: menuList
        })
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    render() {
        const renderMenu = (menuList) => menuList.map(
            menu =>
                <TreeNode title={menu.title} key={menu.id}>
                    {menu.children && menu.children.length > 0 ? renderMenu(menu.children) : ''}
                </TreeNode>
        )

        return (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Tree
                            onSelect={this.onSelect}
                        >
                            {renderMenu(this.state.menuList)}
                        </Tree>

                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Menu;