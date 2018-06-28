export default {
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