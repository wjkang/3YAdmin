import React from 'react';
import { Table } from 'antd';
import { getRequestLogPagedList } from 'api';
import { formatDateTime } from '@/utils/util';

class RequestLog extends React.PureComponent {
    state = {
        filter: {
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
            field: 'createdDate',
            order: 'descend'
        },
        loading: false,
    }
    columns = [{
        title: '用户',
        dataIndex: 'createdByName',
    },
    {
        title: 'IP',
        dataIndex: 'ip'
    },
    {
        title: '方法',
        dataIndex: 'method'
    },
    {
        title: '请求',
        dataIndex: 'request'
    },
    {
        title: '耗时(ms)',
        dataIndex: 'time'
    },
    {
        title: '时间',
        dataIndex: 'createdDate',
        sorter: true,
        render: (text, record) => {
            return formatDateTime(record.createdDate)
        }
    }]
    fetch = async (query = {}) => {
        this.setState({ loading: true });
        let dataRes = await getRequestLogPagedList(query);
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
    componentDidMount() {
        this.fetch({
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            sortBy: this.state.sorter.field,
            descending: this.state.sorter.order === 'descend',
            filter: this.state.filter
        });
    }
    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.state.pagedList}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                scroll={{ x: 768 }}
                bordered
            />
        );
    }
}

export default RequestLog;