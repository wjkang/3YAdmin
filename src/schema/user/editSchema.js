export default {
    "$id": "user-edit-schema",
    "title": "user-edit-schema",
    "description": "user-edit-schema.",
    "type": "object",
    "required": [],//可传给后端判断，暂时不使用此处配置检验前端表单,前端表单校验规则配置在uiSchema
    "properties": {
        
            "name":{
                "type":"string",
                "title":"账号名称"
            },
        
            "trueName":{
                "type":"string",
                "title":"用户名称"
            },
        
            "email":{
                "type":"string",
                "title":"用户邮箱"
            },
        
            "phone":{
                "type":"string",
                "title":"phone"
            },
        
    }
}