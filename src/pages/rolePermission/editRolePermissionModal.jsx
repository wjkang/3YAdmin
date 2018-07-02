import React from 'react';
import { Modal, Tree } from 'antd';
import { getMenuFunctions } from 'api';
import { SIGSTOP } from 'constants';

const TreeNode = Tree.TreeNode;

class EditModal extends React.PureComponent {
    state = {
        id: '',
        menuList: [],
        roleFunctions: []
    }
    defaultCheckKeys = []
    onCancel = () => {
        this.props.onCancel();
    }
    onOk = () => {

    }
    buildMenuListAndFunctions = (menuList) => {
        let fn = (list) => {
            for (let menu of list) {
                let children = menuList.filter(s => s.parentId == menu.id);
                let permissionChildren = menu.functions.map(s => {
                    s.isPermissionChild = true;
                    return s;
                });
                if (children && children.length > 0) {
                    fn(children)
                }
                menu.children = [...children, ...permissionChildren];
            }
        }
        let topMenus = menuList.filter(s => s.parentId == 0);
        for (let menu of topMenus) {
            let children = menuList.filter(s => s.parentId == menu.id);
            let permissionChildren = menu.functions.map(s => {
                s.isPermissionChild = true;
                return s;
            });
            if (children && children.length > 0) {
                fn(children)
            }
            menu.children = [...children, ...permissionChildren];
        }
        return topMenus;
    }
    componentWillReceiveProps(nextProps) {
        console.log(121212)
        if (!nextProps.visible) {
            return;
        }
        console.log(444444444)
        let roleId = nextProps.formData.id;
        getMenuFunctions({
            menuId: 0,
            roleId: roleId
        }).then(moduleFunctionsRes => {
            let menuFunctionList = this.buildMenuListAndFunctions(moduleFunctionsRes.data.menuFunctions)
            let rolePermissions = moduleFunctionsRes.data.roleFunctions.map(s => s.functionId);
            this.setState({
                moduleFunctions: moduleFunctionsRes.data.menuFunctions,
                roleFunctions: moduleFunctionsRes.data.roleFunctions
            });
        });
    }
    render() {
        return (
            <Modal
                width={800}
                visible={this.props.visible}
                cancelText="关闭"
                okText="提交"
                title={this.props.title}
                onCancel={this.onCancel}
                onOk={this.onOk}
                destroyOnClose
            >
                <Tree
                    checkable
                    defaultExpandAll
                    defaultCheckedKeys={["0-0-0-0-3"]}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0">
                            <TreeNode title="leaf" key="0-0-0-0">
                                <TreeNode
                                    className="permission-tree-node"
                                    title="leaf"
                                    key="0-0-0-0-1"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="234343434"
                                    key="0-0-0-0-2"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="fgfgfgff"
                                    key="0-0-0-0-3"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="leaf"
                                    key="0-0-0-0-4"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="fgfgfgfgggggg"
                                    key="0-0-0-0-5"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="leaf"
                                    key="0-0-0-0-6"
                                />
                                <TreeNode
                                    className="permission-tree-node"
                                    title="fgfgfg"
                                    key="0-0-0-0-7"
                                />
                            </TreeNode>
                            <TreeNode className="permission-tree-node" title="leaf" key="0-0-0-1" />
                            <TreeNode
                                className="permission-tree-node"
                                title="234343434"
                                key="0-0-0-2"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfgff"
                                key="0-0-0-3"
                            />
                            <TreeNode className="permission-tree-node" title="leaf" key="0-0-0-4" />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfgfgggggg"
                                key="0-0-0-5"
                            />
                            <TreeNode className="permission-tree-node" title="leaf" key="0-0-0-6" />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfg"
                                key="0-0-0-7"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="leafgfgfgfgf"
                                key="0-0-0-8"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfg"
                                key="0-0-0-9"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfgfg"
                                key="0-0-0-10"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfgfg"
                                key="0-0-0-11"
                            />
                            <TreeNode
                                className="permission-tree-node"
                                title="fgfgfgfgfg"
                                key="0-0-0-12"
                            />
                        </TreeNode>
                        <TreeNode className="clear-both" title="parent 1-1" key="0-0-1">
                            <TreeNode
                                title={<span style={{ color: "#1890ff" }}>sss</span>}
                                key="0-0-4-0"
                            />
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </Modal >
        )
    }
}

export default EditModal;