import React from 'react';
import CommonForm from '@/schema/CommonForm';

import { Input, Tag, Button, Divider } from 'antd';
const { TextArea } = Input;
const schema = {
    "$id": "function-edit-schema",
    "title": "function-edit-schema",
    "description": "function-edit-schema.",
    "type": "object",
    "required": ["moduleId", "name", "code"],//可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
    "properties": {
        "id": {
            "type": "string"
        },
        "moduleId": {
            "type": "string",
            "title": "模块Id",
            "description": "相关菜单模块"
        },
        "module": {
            "type": "string",
            "title": "模块名称",
        },
        "name": {
            "type": "string",
            "title": "功能名称",
            "maxLength": 25,//可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
            "minLength": 1
        },
        "code": {
            "type": "string",
            "title": "功能编码",
            "maxLength": 25,
            "minLength": 1
        },
        "description": {
            "type": "string",
            "title": "功能描述",
            "maxLength": 300,
        }
    }
}
const uiSchema = {
    "name": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": ""
        },
        "ui:rules": [
            { required: true, message: '请输入功能名称' },
            { max: 25, message: '最多输入25字符' }
        ],//校验规则
        "ui:title": "功能名称",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }//Form.Item 配置
    },
    "code": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": ""
        },
        "ui:rules": [
            { required: true, message: '请输入功能编码' },
            { max: 25, message: '最多输入25字符' }
        ],//校验规则
        "ui:title": "功能编码",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }//Form.Item 配置
    },
    "description": {
        "ui:widget": "input.textarea",
        "ui:options": {
            "style": {
                "width": 400,
                "height": 200
            },
            "autosize": { minRows: 2, maxRows: 6 },
            "placeholder": ""
        },
        "ui:rules": [
            { max: 300, message: '最多输入300字符!' }
        ],//校验规则
        "ui:title": "功能描述",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }//Form.Item 配置
    },
    "moduleId": {
        "ui:widget": "cascader",//级联
        "ui:options": {
            "filedNames": { label: 'title', value: 'id', children: 'children' },
            "options": []
        },//组件属性配置
        "ui:rules": [{ required: true, message: '请选择模块!' }],//校验规则
        "ui:remoteConfig": {
            "apiKey": "getAllMenu",
            "hand": (data) => {
                return data;
            },//数据处理函数
        },
        "ui:title": "模块",//未设置取schema 中定义的title
        //"ui:description": "请选择模块",//未设置取 schema 中定义的description
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "label": "模块",//未设置取ui:title,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }//Form.Item 配置
    }
}
class CommonFormTest extends React.PureComponent {
    state = {
        schema: schema,
        uiSchema: uiSchema,
        error: '',
        data: ''
    }
    schema = JSON.stringify(schema)
    uiSchema = JSON.stringify(uiSchema)
    schemaChange = (e) => {
        this.schema = e.target.value;
    }
    uiSchemaChange = (e) => {
        this.uiSchema = e.target.value;
    }
    parseSchema = () => {
        if (this.schema == '' || this.uiSchema == '') {
            return;
        }
        try {
            let schema = JSON.parse(this.schema);
            let uiSchema = JSON.parse(this.uiSchema);
            this.setState({
                schema: schema,
                uiSchema: uiSchema,
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
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.schema, null, 4)} onChange={this.schemaChange} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Tag color="#87d068">UiSchema</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.uiSchema, null, 4)} onChange={this.uiSchemaChange} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.parseSchema}>重新解析</Button>
                </div>
                {this.state.error != '' ? <div>{this.state.error}</div> : null}
                <Divider />
                <CommonForm
                    ref={(instance) => { this.editForm = instance; }}
                    noCacheSchema={true}
                    schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    handleSubmit={this.handleSearch}

                />
                {this.state.data != '' ? <div>{this.state.data}</div> : null}
            </div>
        )
    }
}
export default CommonFormTest;