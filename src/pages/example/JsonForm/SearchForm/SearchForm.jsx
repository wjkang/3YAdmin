import React from 'react';
import SearchForm from '@/schema/SearchForm';
import { Input, Tag, Button, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
const { TextArea } = Input;
const searchSchema = {
    "$id": "example-search-schema",
    "title": "example-search-schema",
    "description": "example-search-schema.",
    "type": "object",
    "required": [],
    "properties": {
        "name": {
            "type": "string",
            "title": "账号名称"
        },
        "email": {
            "type": "string",
            "title": "用户邮箱"
        },
        "int": {
            "type": "integer",
            "title": "整数组件"
        },
        "number": {
            "type": "number",
            "title": "浮点数组件"
        },
        "checkbox": {
            "type": "array",
            "title": "checkbox组件"
        },
        "password": {
            "type": "string",
            "title": "密码"
        },
        "datetime": {
            "type": "string",
            "title": "datetime组件"
        },
        "radio": {
            "type": "string",
            "title": "radio组件"
        },
        "select": {
            "type": "array",
            "title": "select组件"
        },
        "switch": {
            "type": "boolean",
            "title": "switch组件"
        },
        "cascader": {
            "type": "array",
            "title": "级联组件"
        },
        "numberBetweenBegin":{
            "type":"number",
            "title":"numberBetweenBegin"
        },
        "numberBetweenEnd":{
            "type":"number",
            "title":"numberBetweenEnd"
        },
        "dateBetweenBegin":{
            "type":"string",
            "title":"dateBetweenBegin"
        },
        "dateBetweenEnd":{
            "type":"string",
            "title":"dateBetweenEnd"
        }
    }
}
const searchUiSchema = {
    "name": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": "账号名称查询"
        },
        "ui:title": "账号名称",
        "ui:description": ""
    },
    "email": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": "用户邮箱查询"
        },
        "ui:title": "用户邮箱",
        "ui:description": ""
    },
    "int": {
        "ui:widget": "inputNumber",
        "ui:options": {
        },
        "ui:defaultValue": 0,
        "ui:title": "整数组件",
        "ui:description": ""
    },
    "number": {
        "ui:widget": "inputNumber",
        "ui:options": {
            "step": 0.1
        },
        "ui:defaultValue": 0.1,
        "ui:title": "浮点数组件",
        "ui:description": ""
    },
    "checkbox": {
        "ui:widget": "checkbox",
        "ui:options": {
            "options": [
                { label: 'Apple', value: 'AppleValue' },
                { label: 'Pear', value: 'PearValue' },
                { label: 'Orange', value: 'OrangeValue', disabled: false },
            ]
        },
        "ui:defaultValue": ['AppleValue'],
        "ui:title": "checkbox组件",
        "ui:description": ""
    },
    "password": {
        "ui:widget": "input",
        "ui:options": {
            "type": "password",
            "placeholder": "密码"
        },
        "ui:title": "密码",
        "ui:description": ""
    },
    "datetime": {
        "ui:widget": "datetime",
        "ui:options": {
            "style": { width: 120 }
        },
        "ui:title": "datetime",
        "ui:description": ""
    },
    "radio": {
        "ui:widget": "radio",
        "ui:options": {
            "options": [
                { label: 'Apple', value: 'AppleValue' },
                { label: 'Pear', value: 'PearValue' },
                { label: 'Orange', value: 'OrangeValue', disabled: false },
            ]
        },
        "ui:defaultValue": 'AppleValue',
        "ui:title": "radio组件",
        "ui:description": ""
    },
    "select": {
        "ui:widget": "select",
        "ui:options": {
            allowClear: true,
            placeholder: '请选择',
            showSearch: true,

        },
        "ui:dataOptions": [
            {
                title: 'Jack',
                value: 'jack'
            },
            {
                title: 'Lucy',
                value: 'lucy'
            },
            {
                title: 'Tom',
                value: 'tom',
                disabled: true
            }
        ],
        "ui:defaultValue": 'lucy',
        "ui:title": "select组件",
        "ui:description": ""
    },
    "switch": {
        "ui:widget": "switch",
        "ui:options": {
            checkedChildren: '激活',
            unCheckedChildren: '锁定'
        },
        "ui:defaultValue": true,
        "ui:title": "switch",
        "ui:description": ""
    },
    "numberBetween":{
        "ui:widget": "between",
        "ui:type":"number",
        "ui:options": {
            "step": 0.1
        },
        "ui:defaultBeginValue":0.1,
        "ui:defaultEndValue":0.2,
        "ui:title": "范围参数组件",
        "ui:description": ""
    },
    "dateBetween":{
        "ui:widget": "between",
        "ui:type":"date",
        "ui:options": {
            "style": { width: 130 }
        },
        "ui:title": "范围参数组件",
        "ui:description": ""
    },
    "cascader": {
        "ui:widget": "cascader",
        "ui:options": {
            allowClear:true,
            expandTrigger:'hover',
            showSearch:true,
            options: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                }],
            }]
        },
        "ui:defaultValue": ['zhejiang', 'hangzhou', 'xihu'],
        "ui:title": "级联组件",
        "ui:description": ""
    }
}
class SearchFormTest extends React.PureComponent {
    state = {
        searchSchema: searchSchema,
        searchUiSchema: searchUiSchema,
        error: '',
        data: ''
    }
    searchSchema = JSON.stringify(searchSchema)
    searchUiSchema = JSON.stringify(searchUiSchema)
    searchSchemaChange = (e) => {
        this.searchSchema = e.target.value;
    }
    searchUiSchemaChange = (e) => {
        this.searchUiSchema = e.target.value;
    }
    parseSchema = () => {
        if (this.searchSchema == '' || this.searchUiSchema == '') {
            return;
        }
        try {
            let searchSchema = JSON.parse(this.searchSchema);
            let searchUiSchema = JSON.parse(this.searchUiSchema);
            this.setState({
                searchSchema: searchSchema,
                searchUiSchema: searchUiSchema,
                error: ''
            })
        } catch (e) {
            this.setState({
                error: e.toString()
            });
        }
    }
    handleSearch = (data) => {
        this.setState({
            data: JSON.stringify(data, null, 4)
        })
        let search = queryString.stringify(data)
        this.props.history.push({
            path: this.props.location.pathname,
            search: search
        });
        //直接查询
    }
    handleReset = () => {
        this.setState({
            data: ''
        })
    }
    componentDidMount() {
        const search = this.props.location.search;
        let data = queryString.parse(search);
        console.log(data)
    }
    render() {
        console.log("SearchFormTest render")
        return (
            <div>
                <div>
                    <Tag color="#87d068">Schema</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.searchSchema, null, 4)} onChange={this.searchSchemaChange} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Tag color="#87d068">UiSchema</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.searchUiSchema, null, 4)} onChange={this.searchUiSchemaChange} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.parseSchema}>重新解析</Button>
                </div>
                {this.state.error != '' ? <div>{this.state.error}</div> : null}
                <Divider />
                <SearchForm noCacheSchema={true} schema={this.state.searchSchema} uiSchema={this.state.searchUiSchema} handleSubmit={this.handleSearch} handleReset={this.handleReset} />
                {this.state.data != '' ? <div>
                    {this.state.data}
                    <p>注意看地址栏的变化</p>
                </div> : null}
            </div>
        )
    }
}
export default withRouter(SearchFormTest);
