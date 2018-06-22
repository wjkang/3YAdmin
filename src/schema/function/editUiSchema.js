export default {
    "name": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": ""
        },
        "ui:title": "功能名称",
        "ui:description": ""
    },
    "code": {
        "ui:widget": "input",
        "ui:options": {
            "type": "text",
            "placeholder": ""
        },
        "ui:title": "模块编码",
        "ui:description": ""
    },
    "description": {
        "ui:widget": "input.textarea",
        "ui:options": {
            "style": {
                "width": 100,
                "height": 100
            },
            "autosize": { minRows: 2, maxRows: 6 },
            "placeholder": ""
        },
        "ui:title": "功能描述",
        "ui:description": ""
    },
    "moduleId": {
        "ui:widget": "cascader",//级联
        "ui:options": {
            "filedNames": { label: 'title', value: 'id', children: 'children' },
            "options": {}
        },//组件属性配置
        "ui:remoteConfig": {
            "apiKey": "getAllMenu",
            "hand": (data) => {
                return data;
            },//数据处理函数
            "data":{}//成功数据挂载点
        },
        "ui:title": "模块",//覆盖schema 中定义的title
        "ui:description": ""
    }
}