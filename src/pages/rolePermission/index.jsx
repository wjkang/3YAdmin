import React from 'react';
import { Table, Divider, notification, Tag } from 'antd';
import {
    getRolePagedList,
    savePermission
} from 'api';
import SearchForm from '@/schema/SearchForm';
import schema from '@/schema/role';
import EditRolePermissionModal from './editRolePermissionModal';
import '@/style/role-permission.less';

class RolePermission extends React.PureComponent {
    state = {
        tableFilter: {
            name: "",
            code: ""
        },
        searchFormExpand: true,
        tablePagedList: [],
        tablePagination: {
            current: 1,
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `Total ${total} items`
        },
        tableSorter: {
            field: '',
            order: ''
        },
        tableLoading: false,
        editModalVisible: false
    }
    columns = [{
        title: '角色名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '角色编码',
        dataIndex: 'code',
        sorter: true
    },
    {
        title: '操作',
        dataIndex: 'id',
        fixed: 'right',
        width: 120,
        render: (text, record) => {
            return <div>
                <a
                    href="javascript:;"
                    onClick={() => this.editRolePermission(record)}

                >
                    编辑角色权限
                </a>
            </div>
        }
    }]
    editFormData = {

    }
    /**
     * @description 查询
     */
    handleSearch = (filter) => {
        const pager = { ...this.state.tablePagination };
        pager.current = 1;
        this.setState({
            tableFilter: filter,
            tablePagination: pager
        });
        let query = {
            pageIndex: 1,
            pageSize: this.state.tablePagination.pageSize,
            sortBy: this.state.tableSorter.field,
            descending: this.state.tableSorter.order === 'descend',
            filter: filter
        };
        this.fetch(query);
    }
    /**
     * @description 重置查询
     */
    handleReset = () => {
        this.setState({
            tableFilter: {}
        });
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.tablePagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            tablePagination: pager,
            tableSorter: {
                field: sorter.field,
                order: sorter.order
            }
        });
        let query = {
            pageIndex: pager.current,
            pageSize: pager.pageSize,
            sortBy: sorter.field,
            descending: sorter.order === 'descend',
            filter: this.state.tableFilter
        };
        this.fetch(query);
    }
    editRolePermission = (record) => {
        this.editFormData = { ...record };
        console.log(this.editFormData)
        this.setState({
            editModalVisible: true
        })
    }
    editModalOnCancel = () => {
        this.setState({
            editModalVisible: false
        });
    }
    saveRolePermission = async (data) => {
        let formData = {...data }
        try {
            await savePermission(formData);
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '保存成功',
            });
            this.setState({
                editModalVisible: false
            });
        }
        catch (e) {

        }
    }
    refresh = () => {
        let query = {
            pageIndex: this.state.tablePagination.current,
            pageSize: this.state.tablePagination.pageSize,
            sortBy: this.state.tableSorter.field,
            descending: this.state.tableSorter.order === 'descend',
            filter: this.state.tableFilter
        };
        this.fetch(query);
    }
    fetch = async (query = {}) => {
        this.setState({ tableLoading: true });
        let dataRes = await getRolePagedList(query);
        let data = dataRes.data;
        const pagination = { ...this.state.tablePagination };
        pagination.total = data.totalCount;
        this.setState({
            tableLoading: false,
            tablePagedList: data.rows,
            tablePagination: pagination
        });
    }
    componentDidMount() {
        this.refresh()
    }
    render() {
        console.log("RolePermission render")
        return (
            <div>
                <SearchForm schema={schema.searchSchema} uiSchema={schema.searchUiSchema} handleSubmit={this.handleSearch} handleReset={this.handleReset} />
                <Divider />
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={this.state.tablePagedList}
                    pagination={this.state.tablePagination}
                    loading={this.state.tableLoading}
                    onChange={this.handleTableChange}
                    scroll={{ x: 768 }}
                    bordered
                />
                <EditRolePermissionModal
                    visible={this.state.editModalVisible}
                    title={<span>编辑角色&nbsp;&nbsp;<Tag color="#2db7f5">{this.editFormData.name}</Tag>&nbsp;权限</span>}
                    onCancel={this.editModalOnCancel}

                    formData={this.editFormData}
                    handFormSubmit={this.saveRolePermission}
                />
            </div>
        );
    }
}

export default RolePermission;