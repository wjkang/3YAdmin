export default {
    "name": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": "",
            "onBlur": (e) => {
                const value = e.target.value;
                console.log(value)
            }
        },
        "ui:rules": [
            { required: true, message: '请输入角色名称' },
            { max: 25, message: '最多输入25字符' }
        ],//校验规则
        "ui:title": "角色名称",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        },//Form.Item 配置
        "ui:onBlur": (e) => {
            const value = e.target.value;
            console.log(value)
        }
    },
    "code": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": ""
        },
        "ui:rules": [
            { required: true, message: '请输入角色编码' },
            { max: 25, message: '最多输入25字符' }
        ],//校验规则
        "ui:title": "角色编码",
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
        "ui:title": "角色描述",
        "ui:description": "",
        "ui:formItemConfig": {
            "hasFeedback": true,
            //"extra":"121212",//未设置取ui:description
            "labelCol": { span: 6 },
            "wrapperCol": { span: 16 }
        },//Form.Item 配置
        "ui:required": [
            {
                "name": "name",
                "message": "请先填写角色名称"
            },
            {
                "name": "code",
                "message": "请先填写角色编码"
            }
        ]
    }
}