import React from 'react';
import { Table, Popconfirm, Divider, Button, notification } from 'antd';
import {
    getRolePagedList,
    delRole,
    delRoles,
    saveRole
} from 'api';
import SearchForm from '@/schema/SearchForm';
import schema from '@/schema/role';
import EditRoleModal from './editRoleModal';

class Role extends React.PureComponent {
    state = {
        tableFilter: {
            name: "",
            code: ""
        },
        searchFormExpand: true,
        tableSelectedRowKeys: [],
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
                    onClick={() => this.editRole(record)}

                >
                    编辑
                </a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={() => this.delRole(record.id)}>
                    <a href="javascript:;">删除</a>
                </Popconfirm>
            </div>
        }
    }]
    editFormData = {

    }
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
    onSelectChange = (selectedRowKeys) => {
        this.setState({ tableSelectedRowKeys:selectedRowKeys });
    }
    addRole = () => {
        this.editFormData = {}
        this.setState({
            editModalVisible: true
        })
    }
    batchDelRole = async () => {
        try {
            await delRoles({
                ids: JSON.stringify(
                    this.state.tableSelectedRowKeys.map(s => {
                        return s;
                    })
                )
            });
            this.setState({
                tableSelectedRowKeys: []
            })
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '删除成功',
            });
        } catch (e) {

        }
        this.refresh()
    }
    editRole = (record) => {
        this.editFormData = { ...record };
        this.setState({
            editModalVisible: true
        })
    }
    delRole = async (id) => {
        try {
            await delRole({ id: id });
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '删除成功',
            });
        } catch (e) {

        }
        this.refresh()
    }
    editModalOnCancel = () => {
        this.setState({
            editModalVisible: false
        });
    }
    saveRole = async (data) => {
        let formData = { ...this.editFormData, ...data }
        try {
            await saveRole(formData);
            this.setState({
                editModalVisible: false
            });
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '保存成功',
            });
        }
        catch (e) {

        }
        this.refresh()
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
            tablePagination:pagination
        });
    }
    componentDidMount() {
        this.refresh()
    }
    render() {
        console.log("Role render")
        const { tableSelectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys:tableSelectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = tableSelectedRowKeys.length > 0;
        return (
            <div>
                <SearchForm schema={schema.searchSchema} uiSchema={schema.searchUiSchema} handleSubmit={this.handleSearch} handleReset={this.handleReset} />
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        icon="plus-square-o"
                        onClick={this.addRole}
                    >
                        新增
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除?" onConfirm={this.batchDelRole}>
                        <Button
                            type="danger"
                            disabled={!hasSelected}
                            icon="delete"
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={this.state.tablePagedList}
                    pagination={this.state.tablePagination}
                    loading={this.state.tableLoading}
                    onChange={this.handleTableChange}
                    scroll={{ x: 768 }}
                    bordered
                />
                <EditRoleModal
                    visible={this.state.editModalVisible}
                    title={this.editFormData.id ? '编辑' : '新增'}
                    onCancel={this.editModalOnCancel}
                    destroyOnClose

                    schema={schema.editSchema}
                    uiSchema={schema.editUiSchema}
                    formData={this.editFormData}
                    handFormSubmit={this.saveRole}
                />
            </div>
        );
    }
}

export default Role;