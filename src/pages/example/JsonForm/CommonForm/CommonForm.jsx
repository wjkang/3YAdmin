import React from 'react';
import CommonForm from '@/schema/CommonForm';

import { Input, Tag, Button, Divider, Icon } from 'antd';
const { TextArea } = Input;
const schema = {
    "$id": "example-edit-schema",
    "title": "example-edit-schema",
    "description": "example-edit-schema.",
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
        "numberBetweenBegin": {
            "type": "number",
            "title": "numberBetweenBegin"
        },
        "numberBetweenEnd": {
            "type": "number",
            "title": "numberBetweenEnd"
        },
        "dateBetweenBegin": {
            "type": "string",
            "title": "dateBetweenBegin"
        },
        "dateBetweenEnd": {
            "type": "string",
            "title": "dateBetweenEnd"
        },
        "upload": {
            "type": "string",
            "title": "upload上传"
        },
        "upload.dragger": {
            "type": "string",
            "title": "upload上传"
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
    },
    "int": {
        "ui:widget": "inputNumber",
        "ui:options": {
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:defaultValue": 0,
        "ui:title": "整数组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "number": {
        "ui:widget": "inputNumber",
        "ui:options": {
            "step": 0.1
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:defaultValue": 0.1,
        "ui:title": "浮点数组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
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
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:defaultValue": ['AppleValue'],
        "ui:title": "checkbox组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "password": {
        "ui:widget": "input",
        "ui:options": {
            "type": "password",
            "placeholder": "密码"
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:title": "密码",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "datetime": {
        "ui:widget": "datetime",
        "ui:options": {
            showTime: true,
            format: "YYYY-MM-DD HH:mm:ss"
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:title": "datetime",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
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
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:defaultValue": 'AppleValue',
        "ui:title": "radio组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "select": {
        "ui:widget": "select",
        "ui:options": {
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
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
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "switch": {
        "ui:widget": "switch",
        "ui:options": {
            checkedChildren: '激活',
            unCheckedChildren: '锁定'
        },
        "ui:defaultValue": true,
        "ui:title": "switch",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "numberBetween": {
        "ui:widget": "between",
        "ui:type": "number",
        "ui:options": {
            "step": 0.1
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:defaultBeginValue": 0.1,
        "ui:defaultEndValue": 0.2,
        "ui:title": "范围参数组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "dateBetween": {
        "ui:widget": "between",
        "ui:type": "date",
        "ui:options": {
            "style": { width: 130 }
        },
        "ui:rules": [{ required: true, message: '不能为空!' }],
        "ui:title": "范围参数组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "upload": {
        "ui:widget": "upload",
        "ui:options": {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture'
        },
        "ui:children": <Button><Icon type="upload" /> Click to Upload</Button>,
        "ui:rules": [{ required: true, message: '请上传!' }],
        "ui:getValueFromEvent": (e) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        },
        "ui:defaultValue": [{
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }, {
            uid: 2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }, {
            uid: 3,
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }],
        "ui:title": "上传组件",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    },
    "upload.dragger": {
        "ui:widget": "upload",
        "ui:type": "dragger",
        "ui:options": {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            multiple: true
        },
        "ui:children": <div>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </div>,
        "ui:rules": [{ required: true, message: '请上传!' }],
        "ui:getValueFromEvent": (e) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        },
        "ui:defaultValue": [{
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }, {
            uid: 2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }, {
            uid: 3,
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://i.loli.net/2018/07/15/5b4b530ecc1b1.jpg',
        }],
        "ui:title": "拖拽上传",
        "ui:description": "",
        "ui:formItemConfig": {
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        }
    }
}
const formData = {
    "name": "1212",
    "code": "1212121",
    "moduleId": [
        "3942a177-a52d-494b-bcd5-c3c1aba90b02",
        "779a4d68-9163-41ff-a9d1-19c6146ef470",
        "6bcf5fd6-3677-45ac-aa3b-7b016ef20f71"
    ]
}
class CommonFormTest extends React.PureComponent {
    state = {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
        data: ''
    }
    schema = JSON.stringify(schema)
    uiSchema = JSON.stringify(uiSchema, function (key, val) {
        if (typeof val === 'function') {
            return val.toString();
        }
        return val;
    })

    getFormData = (data) => {
        this.setState({
            data: JSON.stringify(data, null, 4)
        })
    }
    handleSubmit = () => {
        this.editForm.handleSubmit();
    }
    handleReset = () => {
        this.editForm.handleReset()

        this.setState({
            data: '',
            formData: {
                "name": "",
                "code": "",
                "moduleId": []
            }//不重置formData，表单reset后显示的是初始设置的默认值
        })
    }
    render() {
        console.log("CommonFormTest render")
        return (
            <div>
                <div>
                    <Tag color="#87d068">Schema</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.schema, null, 4)} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Tag color="#87d068">UiSchema</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(this.state.uiSchema, function (key, val) {
                        if (typeof val === 'function') {
                            return val.toString();
                        }
                        return val;
                    }, 4)} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Tag color="#87d068">FormData</Tag>
                    <TextArea rows={15} defaultValue={JSON.stringify(formData, null, 4)} />
                </div>
                <Divider />
                <CommonForm
                    ref={(instance) => { this.editForm = instance; }}
                    schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    formData={this.state.formData}
                    handleSubmit={this.getFormData}
                />
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.handleReset}>清空</Button>
                </div>
                {this.state.data != '' ? <div>{this.state.data}</div> : null}
            </div>
        )
    }
}
export default CommonFormTest;