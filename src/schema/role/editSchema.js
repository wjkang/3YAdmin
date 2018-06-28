export default {
    "$id": "role-edit-schema",
    "title": "role-edit-schema",
    "description": "role-edit-schema.",
    "type": "object",
    "required": ["name", "code"],//可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string",
            "title": "角色名称",
            "maxLength": 25,//可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
            "minLength": 1
        },
        "code": {
            "type": "string",
            "title": "角色编码",
            "maxLength": 25,
            "minLength": 1
        },
        "description": {
            "type": "string",
            "title": "角色描述",
            "maxLength": 300,
        }
    }
}