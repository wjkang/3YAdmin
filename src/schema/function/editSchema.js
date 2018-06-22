export default {
    "$id": "function-edit-schema",
    "title": "function-search-schema",
    "description": "function-search-schema.",
    "type": "object",
    "required": ["moduleId","name","code"],
    "properties": {
        "id": {
            "type": "string"
        },
        "moduleId": {
            "type": "string",
            "title": "模块Id"
        },
        "module": {
            "type": "string",
            "title": "模块名称"
        },
        "name": {
            "type": "string",
            "title": "功能名称"
        },
        "code": {
            "type": "string",
            "title": "功能编码"
        },
        "description": {
            "type": "string",
            "title": "功能描述"
        }
    }
}