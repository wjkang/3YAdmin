import React from 'react';
import { Row, Col, Tree, Form, Input, Button, Switch, InputNumber, message, Tag, Icon, Table, Popconfirm, Divider } from 'antd';
import {
    getFunctionPagedList,
    delFunction,
    delFunctions,
    saveFunction
} from 'api';


const columns = [{
    title: '模块名称',
    dataIndex: 'module',
    sorter: true,
    width: '30%',
},
{
    title: '功能名称',
    dataIndex: 'name',
    sorter: true,
    width: '30%',
},
{
    title: '功能编码',
    dataIndex: 'code',
    width:'30%',
    sorter: true
},
{
    title: '操作',
    dataIndex: 'id',
    width:'10%',
    render: (text, record) => {
        return <div>
            <a
                href="javascript:;"
                onClick={this.edit}

            >
                编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={this.onDelete}>
                <a href="javascript:;">删除</a>
            </Popconfirm>
        </div>
    }
}];

class Function extends React.PureComponent {
    state = {
        filter: {
            module: "",
            name: "",
            code: ""
        },
        expand: true,
        pagedList: [],
        pagination: {
            current: 1,
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
        },
        loading: false
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getSearchFields() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const children = [];
        for (let i = 0; i < 3; i++) {
            children.push(
                <Col xs={24} sm={24} md={12} lg={6} xl={6} key={i} style={{ display: this.state.expand ? 'block' : 'none' }}>
                    <Form.Item {...formItemLayout} label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </Form.Item>
                </Col>
            );
        }
        console.log("getSearchFields")
        return children;
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
        pager.pageSize=pagination.pageSize;
        this.setState({
            pagination: pager,
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
    edit=()=>{
        alert(1212);
    }
    componentDidMount() {
        this.fetch({
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            filter: this.state.filter
        });
    }
    render() {
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>{this.getSearchFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <span style={{ display: this.state.expand ? 'inline' : 'none' }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    清空
                        </Button>
                            </span>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                {this.state.expand ? '收起查询' : '展开查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.pagedList}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default Form.create()(Function);

