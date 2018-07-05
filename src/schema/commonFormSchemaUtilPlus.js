import React from 'react';
import createClass from 'create-react-class';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Cascader
} from 'antd';
import * as api from 'api';
import remoteDataUtil from './CommonFormRemoteDataUtil';

const FormItem = Form.Item;

//暂存的JsxGenerator
const JsxGeneratorMap = new Map();

//暂存表单组件, key是schema 的$id, value是对应的react组件
const FormMap = new Map();

//缓存uiSchema,uiSchema中存在需动态获取的数据,获取后更新uiSchema并缓存
const UiSchemaMap = new Map();

//缓存表单实例,key还是用schema 的$id+Index,组件实例化的时候存入，组件销毁的时候移除
const FormInstanceMap = new Map();
//缓存表单实例maxIndex;
const FormInstanceIndexMap = new Map();

const SchemaUtils = {
    getForm(schema, uiSchema) {
        const id = schema["$id"];
        if (FormMap.has(id)) {
            return FormMap.get(id);
        } else {
            const newForm = this.createForm(id, schema, uiSchema);
            FormMap.set(id, newForm);
            return newForm;
        }
    },
    createForm(id, schema, uiSchema) {
        console.log("createCommonForm")
        const util = this;
        // 只能用传统的ES5的写法, 函数式(无状态)组件应该也可以, 但是需要生命周期相关方法
        const tmpComponent = createClass({
            getInitialState() {
                let index = FormInstanceIndexMap.get(id);
                if (!index) {
                    index = 1;
                } else {
                    index++;
                }
                FormInstanceIndexMap.set(id, index);
                FormInstanceMap.set(id + "-" + index, this);
                return {
                    inited: false,
                    index: id + "-" + index
                };
            },
            componentWillMount() {
                console.log("tmpCommonForm componentWillMount");

                // 组件初始化时读取generator
                if (JsxGeneratorMap.has(id)) {
                    this.generateJsx = JsxGeneratorMap.get(id);
                    return;
                }
            },
            async componentDidMount() {
                if (UiSchemaMap.has(id)) {
                    //jsx结构已经构建并缓存
                    return;
                }

                util.mergeSchema(this.state.index, schema, uiSchema);

                await util.getRemoteData(id, uiSchema);

                UiSchemaMap.set(id, true);


                const generateJsx = util.parse(id, schema, uiSchema);//parse方法返回一个真正生成jsx结构的方法，调用的时候传入组件实例的index,从全局缓存获取组件实例传入(也可以直接传入组件实例)

                JsxGeneratorMap.set(id, generateJsx);

                this.generateJsx = generateJsx;

                this.setState({
                    inited: true
                })

            },
            componentWillUnmount() {
                FormInstanceMap.delete(this.state.index);
                console.log(FormInstanceMap.size)
            },
            render() {
                console.log("tmpCommonForm render");
                let formData = this.props.formData;
                formData = formData || {}
                //组件实例key一层层往下传递
                return this.generateJsx ? this.generateJsx(this.state.index, formData) : null;
            },
        });
        // 注意要再用antd的create()方法包装下
        return Form.create()(tmpComponent);
    },
    mergeSchema(formInstanceIndex, schema, uiSchema) {
        let instance = FormInstanceMap.get(formInstanceIndex);
        Object.keys(uiSchema).forEach(function (key) {
            let schemaProperty = schema["properties"][key];
            let uiSchemaProperty = uiSchema[key];
            uiSchemaProperty.key = key;
            if (uiSchemaProperty["ui:rules"] === undefined) {
                uiSchemaProperty["ui:rules"] = []
            }
            if (uiSchemaProperty["ui:formItemConfig"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"] = {}
            }
            //merge description 
            if (uiSchemaProperty["ui:formItemConfig"]["extra"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["extra"] = uiSchemaProperty["ui:description"]
            }
            if (uiSchemaProperty["ui:formItemConfig"]["extra"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["extra"] = schemaProperty["description"];
            }
            //merge title
            if (uiSchemaProperty["ui:formItemConfig"]["label"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["label"] = uiSchemaProperty["ui:title"]
            }
            if (uiSchemaProperty["ui:formItemConfig"]["label"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["label"] = schemaProperty["title"];
            }
            //config labelCol 
            if (uiSchemaProperty["ui:formItemConfig"]["labelCol"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["labelCol"] = { span: 8 };
            }
            //config wrapperCol 
            if (uiSchemaProperty["ui:formItemConfig"]["wrapperCol"] === undefined) {
                uiSchemaProperty["ui:formItemConfig"]["wrapperCol"] = { span: 16 };
            }
            //required
            if (uiSchemaProperty["ui:required"] !== undefined) {
                uiSchemaProperty["ui:rules"].push({
                    validator: (rule, value, callback) => {
                        const form = instance.props.form;
                        let msg = [];
                        for (let required of uiSchemaProperty["ui:required"]) {
                            if (value && !form.getFieldValue(required.name)) {
                                msg.push(required.message)
                            }
                        }
                        if (msg.length > 0) {
                            callback(msg.join(","));
                        } else {
                            callback();
                        }
                    }
                })
            }

        })
    },
    async getRemoteData(id, uiSchema) {
        console.log("getRemoteData")
        const util = this;
        let calls = [];
        Object.keys(uiSchema).forEach(function (key) {
            let field = uiSchema[key];
            if (field["ui:remoteConfig"]) {
                switch (field["ui:widget"]) {
                    case 'select':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    case 'radio':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    case 'checkbox':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    case 'multiSelect':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    case 'between':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    case 'cascader':
                        calls.push(util.getCascaderRemoteData(id, field));
                        break;
                    default:
                        calls.push(util.getCascaderRemoteData(id, field));
                }
            }
        });
        if (calls.length > 0) {
            await Promise.all([...calls]);
        }

    },
    parse(id, schema, uiSchema) {
        console.log("parse CommonForm schema")
        let items = [];
        let schemaProperties = schema["properties"];
        const util = this;
        Object.keys(uiSchema).forEach(function (key) {
            let field = uiSchema[key];
            const schemaProperty = schemaProperties[key];
            // 注意, 每个字段transform之后, 返回的也都是一个回调函数, 所以items其实是一个回调函数的集合
            switch (field["ui:widget"]) {
                case 'select':
                    items.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'radio':
                    items.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'checkbox':
                    items.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'multiSelect':
                    items.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'between':
                    items.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'cascader':
                    items.push(util.transformCascader(field, schemaProperty));
                    break;
                default:
                    items.push(util.transformNormal(field, schemaProperty));
            }
        });
        //调用parse返回的函数，也是被缓存的函数(其实是为了缓存items,一些构建form item的函数)，真正构建jsx是调用此函数，
        return (formInstanceIndex, formData) => {
            const formItems = [];
            const getFieldDecorator = FormInstanceMap.get(formInstanceIndex).props.form.getFieldDecorator;
            for (const item of items) {
                formItems.push(item(getFieldDecorator, formData));
            }
            return (<Form>
                {formItems}
            </Form>);
        };
    },
    getCascaderRemoteData(id, field) {
        const { apiKey } = field["ui:remoteConfig"];
        return new Promise(function (resolve, reject) {
            api[apiKey]().then(res => {
                let data = res.data;
                data = field["ui:remoteConfig"]["hand"](data);
                field["ui:options"]["options"] = data;
                remoteDataUtil.addData(id + "_" + field.key, data)
                resolve(data);
            });
        });
    },
    transformNormal(field, schemaProperty) {
        switch (field["ui:widget"]) {
            case 'int':
                return this.formItemWrapper((getFieldDecorator, formData) => getFieldDecorator(field.key, { initialValue: formData[field.key] })(
                    <InputNumber size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'float':
                return this.formItemWrapper((getFieldDecorator, formData) => getFieldDecorator(field.key, { initialValue: formData[field.key] })(
                    <InputNumber step={0.01} size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'datetime':
                return this.formItemWrapper((getFieldDecorator, formData) => getFieldDecorator(field.key, { initialValue: formData[field.key] })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={field.placeholder || '请选择日期'} />
                ), field);
            case 'input.textarea':
                return this.formItemWrapper(
                    (getFieldDecorator, formData) =>
                        getFieldDecorator(field.key,
                            {
                                initialValue: formData[field.key],
                                rules: [...field["ui:rules"]]
                            })(<Input.TextArea {...field["ui:options"]} />),
                    field);
            default:  // 默认就是普通的输入框
                return this.formItemWrapper(
                    (getFieldDecorator, formData) =>
                        getFieldDecorator(field.key,
                            {
                                initialValue: formData[field.key],
                                rules: [...field["ui:rules"]]
                            })(<Input {...field["ui:options"]} />),
                    field);
        }
    },
    transformCascader(field, schemaProperty) {
        return (getFieldDecorator, formData) => (
            <FormItem key={field.key} {...field["ui:formItemConfig"]}>
                {getFieldDecorator(field.key, {
                    initialValue: formData[field.key],
                    rules: [...field["ui:rules"]]
                })(
                    <Cascader {...field["ui:options"]} />
                )}
            </FormItem>
        );
    },
    formItemWrapper(formItem, field) {
        return (getFieldDecorator, formData) => (
            <FormItem key={field.key} {...field["ui:formItemConfig"]}>
                {formItem(getFieldDecorator, formData)}
            </FormItem>
        );
    }
}
export default SchemaUtils;