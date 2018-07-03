import React from 'react';
import { Modal, Tree } from 'antd';
import { getMenuFunctions } from 'api';

const TreeNode = Tree.TreeNode;

class EditModal extends React.PureComponent {
    state = {
        id: '',
        menuFunctionList: []
    }
    defaultCheckKeys = []
    checkedKeys = [];
    onCancel = () => {
        this.props.onCancel();
        this.setState({
            menuFunctionList: []
        });
        this.defaultCheckKeys = []
        this.checkedKeys = []
    }
    onOk =async () => {
        let data = {
            roleId: this.props.formData.id,
            permissions: this.checkedKeys,
            moduleId: 0
        };
        await this.props.handFormSubmit(data);
        this.setState({
            menuFunctionList: []
        });
        this.defaultCheckKeys = []
        this.checkedKeys = []
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
    onCheck = (checkedKeys, info) => {
        this.checkedKeys = checkedKeys.filter(s => s.indexOf("menu") < 0);
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
            this.defaultCheckKeys = rolePermissions;
            this.checkedKeys = rolePermissions;
            this.setState({
                menuFunctionList: menuFunctionList
            });
        });
    }
    renderTreeNode = (menuFunctionList) => {
        let list = [];
        for (let item of menuFunctionList) {
            if (item.children && item.children.length > 0) {
                if (item.isPermissionChild) {
                    list.push(<TreeNode className="permission-tree-node" title={item.name} key={item.id}>{this.renderTreeNode(item.children)}</TreeNode>);
                } else {
                    list.push(<TreeNode className="clear-both" title={<span style={{ color: 'rgb(181, 185, 189)' }}>{item.title}</span>} key={'menu' + item.id}>{this.renderTreeNode(item.children)}</TreeNode>);
                }
            } else {
                if (item.isPermissionChild) {
                    list.push(<TreeNode className="permission-tree-node" title={item.name} key={item.id}></TreeNode>);
                } else {
                    list.push(<TreeNode className="clear-both" title={<span style={{ color: 'rgb(181, 185, 189)' }}>{item.title}</span>} key={'menu' + item.id}></TreeNode>);
                }
            }
        }
        return list;
    }
    renderTree = () => {
        return <Tree
            checkable
            multiple
            defaultExpandAll
            defaultCheckedKeys={this.defaultCheckKeys}
            onCheck={this.onCheck}
            selectable={false}
        >
            {this.renderTreeNode(this.state.menuFunctionList)}
        </Tree>
    }
    render() {
        console.log("render");
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
                {this.state.menuFunctionList.length > 0 ? this.renderTree() : null}
            </Modal >
        )
    }
}

export default EditModal;