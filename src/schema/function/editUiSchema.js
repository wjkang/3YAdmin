export default {
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