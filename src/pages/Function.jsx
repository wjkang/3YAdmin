import React from 'react';
import { Table, Popconfirm, Divider, Button, Modal, notification } from 'antd';
import {
    getFunctionPagedList,
    delFunction,
    delFunctions,
    saveFunction
} from 'api';
import SearchForm from '@/schema/SearchForm';
import CommonForm from '@/schema/CommonForm';
import schema from '@/schema/function';
import PermissionContainer from 'permission';
import formRemoteDataUtil from '@/schema/FormRemoteDataUtil';
import util from '@/utils/util';

const style = { display: 'none' };

class Function extends React.PureComponent {
    state = {
        filter: {
            module: "",
            name: "",
            code: ""
        },
        expand: true,
        selectedRowKeys: [],
        pagedList: [],
        pagination: {
            current: 1,
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `Total ${total} items`
        },
        sorter: {
            field: '',
            order: ''
        },
        loading: false,
        editModalVisible: false
    }
    columns = [{
        title: '模块名称',
        dataIndex: 'module',
        sorter: true
    },
    {
        title: '功能名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '功能编码',
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
                    onClick={() => this.editFunction(record)}

                >
                    编辑
                </a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={() => this.delFunction(record.id)}>
                    <a href="javascript:;">删除</a>
                </Popconfirm>
            </div>
        }
    }]
    editFormData = {

    }
    fetch = async (query = {}) => {
        this.setState({ loading: true });
        let dataRes = await getFunctionPagedList(query);
        let data = dataRes.data;
        const pagination = { ...this.state.pagination };
        pagination.total = data.totalCount;
        this.setState({
            loading: false,
            pagedList: data.rows,
            pagination,
        });
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
            sorter: {
                field: sorter.field,
                order: sorter.order
            }
        });
        let query = {
            pageIndex: pager.current,
            pageSize: pager.pageSize,
            sortBy: sorter.field,
            descending: sorter.order === 'descend',
            filter: this.state.filter
        };
        this.fetch(query);
    }
    handleSearch = (filter) => {
        const pager = { ...this.state.pagination };
        pager.current = 1;//查询回到第一页
        this.setState({
            filter: filter,
            pagination: pager
        });
        let query = {
            pageIndex: 1,
            pageSize: this.state.pagination.pageSize,
            sortBy: this.state.sorter.field,
            descending: this.state.sorter.order === 'descend',
            filter: filter
        };
        this.fetch(query);
    }
    handleReset = () => {
        this.setState({
            filter: {}
        });
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    delFunction = async (id) => {
        try {
            await delFunction({ id: id });
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '删除成功',
            });
        } catch (e) {

        }
        this.refresh()
    }
    batchDelFunction = async () => {
        try {
            await delFunctions({
                ids: JSON.stringify(
                    this.state.selectedRowKeys.map(s => {
                        return s;
                    })
                )
            });
            this.setState({
                selectedRowKeys: []
            })
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '删除成功',
            });
        } catch (e) {

        }
        this.refresh()
    }
    addFunction = () => {
        this.editFormData = {}
        this.setState({
            editModalVisible: true
        })
    }
    editFunction = (record) => {
        let menuList = formRemoteDataUtil.getData(schema.editSchema["$id"] + "_moduleId");
        let openMenuList = util.openTreeData(menuList);
        let menuWithParent = util.getTreeEleWithParent(record.moduleId, openMenuList);
        let moduleId = menuWithParent.map(s => s.id);
        this.editFormData = { ...record, moduleId };
        this.setState({
            editModalVisible: true
        })
    }
    saveFunction = async (data) => {
        let formData = { ...this.editFormData, ...data }
        let menuList = formRemoteDataUtil.getData(schema.editSchema["$id"] + "_moduleId");
        formData.moduleId = formData.moduleId[formData.moduleId.length - 1]
        let menu = util.getTreeEleByPropertyValue(formData.moduleId, "id", menuList);
        formData.module = menu.title;
        try {
            await saveFunction(formData);

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
    editModalOnOk = () => {
        //不直接调用saveFunction，是因为form组件内部会先校验表单，通过才会调用通过props传进去的saveFunction
        this.editFunctionForm.handleSubmit();
    }
    editModalOnCancel = () => {
        this.setState({
            editModalVisible: false
        });
    }
    refresh = () => {
        let query = {
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            sortBy: this.state.sorter.field,
            descending: this.state.sorter.order === 'descend',
            filter: this.state.filter
        };
        this.fetch(query);
    }
    componentDidMount() {
        this.fetch({
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            filter: this.state.filter
        });
    }
    render() {
        console.log("Function render")
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <SearchForm schema={schema.searchSchema} uiSchema={schema.searchUiSchema} handleSubmit={this.handleSearch} handleReset={this.handleReset} />
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <PermissionContainer permission={["function_edit"]}>
                        <Button
                            type="primary"
                            icon="plus-square-o"
                            onClick={this.addFunction}
                        >
                            新增
                    </Button>
                    </PermissionContainer>
                    <Divider type="vertical" />
                    <PermissionContainer permission={["function_del"]}>
                        <Popconfirm title="确定删除?" onConfirm={this.batchDelFunction}>
                            <Button
                                type="danger"
                                disabled={!hasSelected}
                                icon="delete"
                            >
                                删除
                        </Button>
                        </Popconfirm>
                    </PermissionContainer>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={this.state.pagedList}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ x: 768 }}
                    bordered
                />
                <Modal
                    visible={this.state.editModalVisible}
                    cancelText="关闭"
                    okText="提交"
                    title={this.editFormData.id ? '编辑功能' : '新增功能'}
                    onCancel={this.editModalOnCancel}
                    onOk={this.editModalOnOk}
                    destroyOnClose
                >
                    <CommonForm
                        ref={(instance) => { this.editFunctionForm = instance; }}
                        schema={schema.editSchema}
                        uiSchema={schema.editUiSchema}
                        formData={this.editFormData}
                        handleSubmit={this.saveFunction}
                    />
                </Modal>
                {/* 隐藏组件,做数据初始化,style不先定义每次父组件render都会跟着render */}
                <CommonForm
                    schema={schema.editSchema}
                    uiSchema={schema.editUiSchema}
                    style={style}
                />
            </div>
        );
    }
}

export default Function;

