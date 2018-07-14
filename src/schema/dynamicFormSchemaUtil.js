import React from 'react';
import createClass from 'create-react-class';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    InputNumber,
    Checkbox,
    Radio,
    Select,
    Switch,
    Cascader
} from 'antd';
import * as api from 'api';
import remoteDataUtil from './FormRemoteDataUtil';

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
        console.log("createDynamicForm")
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
                    index: id + "-" + index,
                    generateJsx: null
                };
            },
            componentWillMount() {
                console.log("tmpDynamicForm componentWillMount");

                // 组件初始化时读取generator
                if (JsxGeneratorMap.has(id)) {
                    this.setState({
                        generateJsx: JsxGeneratorMap.get(id)
                    })
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

                //JsxGeneratorMap.set(id, generateJsx);//永远不缓存

                this.setState({
                    inited: true,
                    generateJsx: generateJsx
                })

            },
            componentDidUpdate(prevProps) {
                //antd 表单项变更都会引起组件的变更，根据props判断是否为schema变更触发的，是则重新parse
                if (this.props.toggleParseSchema != prevProps.toggleParseSchema) {

                    console.log('reParse')
                    let propsSchema = this.props.schema;
                    let propsUiSchema = this.props.uiSchema;
                    util.mergeSchema(this.state.index, propsSchema, propsUiSchema);
                    util.getRemoteData(id, propsUiSchema).then(() => {
                        const generateJsx = util.parse(id, propsSchema, propsUiSchema);
                        this.setState({
                            generateJsx: generateJsx
                        })
                    });
                }
            },
            componentWillUnmount() {
                FormInstanceMap.delete(this.state.index);
                console.log(FormInstanceMap.size)
            },
            render() {
                console.log("tmpDynamicForm render");
                let formData = this.props.formData;
                formData = formData || {}
                //组件实例key一层层往下传递
                return this.state.generateJsx ? this.state.generateJsx(this.state.index, formData) : null;
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
        let result = [];
        if (calls.length > 0) {
            result = await Promise.all([...calls]);
        }
        return result;

    },
    parse(id, schema, uiSchema) {
        console.log("parse DynamicForm schema")
        let items = [];
        let schemaProperties = schema["properties"];
        const util = this;
        Object.keys(uiSchema).forEach(function (key) {
            let field = uiSchema[key];
            const schemaProperty = schemaProperties[key];
            // 注意, 每个字段transform之后, 返回的也都是一个回调函数, 所以items其实是一个回调函数的集合
            switch (field["ui:widget"]) {
                case 'inputNumber':
                    items.push(util.transformInputNumber(field, schemaProperty));
                    break;
                case 'checkbox':
                    items.push(util.transformCheckbox(field, schemaProperty));
                    break;
                case 'datetime':
                    items.push(util.transformDatetime(field, schemaProperty));
                    break;
                case 'radio':
                    items.push(util.transformRadio(field, schemaProperty));
                    break;
                case 'select':
                    items.push(util.transformSelect(field, schemaProperty));
                    break;
                case 'switch':
                    items.push(util.transformSwitch(field, schemaProperty));
                    break;
                case 'cascader':
                    items.push(util.transformCascader(field, schemaProperty));
                    break;
                case 'between':
                    items.push(util.transformBetween(field, schemaProperty));
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
    transformInput(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<Input {...field["ui:options"]} />)
            , field);
    },
    transformInputNumber(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<InputNumber {...field["ui:options"]} />)
            , field);
    },
    transformCheckbox(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<Checkbox.Group {...field["ui:options"]} />)
            , field);
    },
    transformDatetime(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<DatePicker {...field["ui:options"]} />)
            , field);
    },
    transformRadio(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<Radio.Group {...field["ui:options"]} />)
            , field);
    },
    transformSelect(field, schemaProperty) {
        let dataOptions = field["ui:dataOptions"] || []
        let options = [];
        for (let o of dataOptions) {
            options.push(<Select.Option key={o.value} value={o.value} disabled={o.disabled}>{o.title}</Select.Option>)
        }
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]]
                })(<Select {...field["ui:options"]}>
                    {options}
                </Select>)
            , field);
    },
    transformSwitch(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultValue"],
                    rules: [...field["ui:rules"]],
                    valuePropName: 'checked'
                })(<Switch {...field["ui:options"]} />)
            , field);
    },
    transformBetween(field, schemaProperty) {
        let begin, end;
        switch (field["ui:type"]) {
            case 'number':
                begin = (getFieldDecorator, formData) => {
                    return (
                        getFieldDecorator(`${field.key}Begin`, {
                            initialValue: formData[field.key + 'Begin'] || field["ui:defaultBeginValue"],
                            rules: [...field["ui:rules"]]
                        })(<InputNumber {...field["ui:options"]} />)
                    );
                };
                end = (getFieldDecorator, formData) => {
                    return (
                        getFieldDecorator(`${field.key}End`, {
                            initialValue: formData[field.key + 'End'] || field["ui:defaultEndValue"],
                            rules: [...field["ui:rules"]]
                        })(<InputNumber {...field["ui:options"]} />)
                    );
                };
                return this.betweenFormItemWrapper(begin, end, field);
            default:
                begin = (getFieldDecorator, formData) => {
                    return (
                        getFieldDecorator(`${field.key}Begin`, {
                            initialValue: formData[field.key + 'Begin'] || field["ui:defaultBeginValue"],
                            rules: [...field["ui:rules"]]
                        })(<DatePicker {...field["ui:options"]} />)
                    );
                };
                end = (getFieldDecorator, formData) => {
                    return (
                        getFieldDecorator(`${field.key}End`, {
                            initialValue: formData[field.key + 'End'] || field["ui:defaultEndValue"],
                            rules: [...field["ui:rules"]]
                        })(<DatePicker {...field["ui:options"]} />)
                    );
                };
                return this.betweenFormItemWrapper(begin, end, field);
        }
    },
    transformCascader(field, schemaProperty) {
        return this.formItemWrapper(
            (getFieldDecorator, formData) =>
                getFieldDecorator(field.key, {
                    initialValue: formData[field.key] || field["ui:defaultEndValue"],
                    rules: [...field["ui:rules"]]
                })(<Cascader {...field["ui:options"]} />),//函数作为参数传递
            field);
    },
    transformNormal(field, schemaProperty) {
        switch (field["ui:widget"]) {
            case 'input.textarea':
                return this.formItemWrapper(
                    (getFieldDecorator, formData) =>
                        getFieldDecorator(field.key,
                            {
                                initialValue: formData[field.key] || field["ui:defaultEndValue"],
                                rules: [...field["ui:rules"]]
                            })(<Input.TextArea {...field["ui:options"]} />)
                    , field);
            default:  // 默认就是普通的输入框
                return this.formItemWrapper(
                    (getFieldDecorator, formData) =>
                        getFieldDecorator(field.key,
                            {
                                initialValue: formData[field.key] || field["ui:defaultEndValue"],
                                rules: [...field["ui:rules"]]
                            })(<Input {...field["ui:options"]} />)
                    , field);
        }
    },
    formItemWrapper(formItem, field) {
        return (getFieldDecorator, formData) => (
            <FormItem key={field.key} {...field["ui:formItemConfig"]}>
                {formItem(getFieldDecorator, formData)}
            </FormItem>
        );
    },
    betweenFormItemWrapper(beginItem, endItem, field) {
        let isNumber = field["ui:type"] === "number";
        let sm = isNumber ? 8 : 11;
        let md = isNumber ? 6 : 8;
        let lg = isNumber ? 5 : 6;
        let xl = isNumber ? 3 : 5;
        return (getFieldDecorator, formData) => (
            <FormItem
                key={field.key}
                {...field["ui:formItemConfig"]}
            >
                <Row>
                    <Col xs={11} sm={sm} md={md} lg={lg} xl={xl}>
                        <FormItem
                            key={'begin' + field.key}
                            {...field["ui:beginFormItemConfig"]}
                        >
                            {beginItem(getFieldDecorator, formData)}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            -
                        </span>
                    </Col>
                    <Col xs={11} sm={sm} md={md} lg={lg} xl={xl} >
                        <FormItem
                            key={'end' + field.key}
                            {...field["ui:endFormItemConfig"]}
                        >
                            {endItem(getFieldDecorator, formData)}
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
        )
    }
}
export default SchemaUtils;