import React from 'react';
import SearchForm from '@/schema/SearchForm';

import { Input, Tag, Button, Divider } from 'antd';
const { TextArea } = Input;
const searchSchema = {
    "$id": "user-search-schema",
    "title": "user-search-schema",
    "description": "user-search-schema.",
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
    }
    handleReset = () => {
        this.setState({
            data: ''
        })
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
                {this.state.data != '' ? <div>{this.state.data}</div> : null}
            </div>
        )
    }
}
export default SearchFormTest;