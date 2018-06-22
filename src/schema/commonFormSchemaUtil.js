import React from 'react';
import createClass from 'create-react-class';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Icon,
    Radio,
    InputNumber,
    Checkbox,
    Cascader
} from 'antd';

const FormItem = Form.Item;

// 暂存的JsxGenerator
const JsxGeneratorMap = new Map();
// 暂存表单组件, key是schema 的$id, value是对应的react组件
const FormMap = new Map();

//缓存uiSchema,uiSchema中存在需动态获取的数据,获取后更新uiSchema并缓存
const UiSchemaMap = new Map();

const SchemaUtils = {
    getForm(schema, uiSchema, formData) {
        const id = schema["$id"];
        if (FormMap.has(id)) {
            return FormMap.get(id);
        } else {
            const newForm = this.createForm(id, schema, uiSchema, formData);
            FormMap.set(id, newForm);
            return newForm;
        }
    },
    createForm(id, schema, uiSchema, formData) {
        console.log("createForm")
        const util = this;
        // 只能用传统的ES5的写法, 函数式(无状态)组件应该也可以, 但是需要生命周期相关方法
        const tmpComponent = createClass({
            componentWillMount() {
                console.log("tmpComponent componentWillMount");
                // 组件初始化时读取generator
                if (JsxGeneratorMap.has(id)) {
                    this.generateJsx = JsxGeneratorMap.get(id);
                    return;
                }
                const generateJsx = util.parse(id, schema, uiSchema, formData);

                JsxGeneratorMap.set(id, generateJsx);

                this.generateJsx = generateJsx;
            },
            render() {
                console.log("tmpComponent render");
                const style = this.props.style;
                // getFieldDecorator一层层往下传递
                return this.generateJsx(this.props.form.getFieldDecorator, style);
            },
        });
        // 注意要再用antd的create()方法包装下
        return Form.create()(tmpComponent);
    },
    parse(id, schema, uiSchema, formData) {
        console.log("parse schema")
        let cols = [];
        let schemaProperties = schema["properties"];
        const util = this;
        Object.keys(uiSchema).forEach(function (key) {
            let data = formData[key];
            let field = uiSchema[key];
            field.key = key;
            const schemaProperty = schemaProperties[key];
            // 注意, 每个字段transform之后, 返回的也都是一个回调函数, 所以cols其实是一个回调函数的集合
            switch (field["ui:widget"]) {
                case 'select':
                    cols.push(util.transformNormal(field, schemaProperty, data));
                    break;
                case 'radio':
                    cols.push(util.transformNormal(field, schemaProperty, data));
                    break;
                case 'checkbox':
                    cols.push(util.transformNormal(field, schemaProperty, data));
                    break;
                case 'multiSelect':
                    cols.push(util.transformNormal(field, schemaProperty, data));
                    break;
                case 'between':
                    cols.push(util.transformNormal(field, schemaProperty, data));
                    break;
                case 'cascader':
                    cols.push(util.transformCascader(field, schemaProperty, data));
                    break;
                default:
                    cols.push(util.transformNormal(field, schemaProperty, data));
            }
        });

        return (getFieldDecorator, style) => {
            const formCols = [];
            for (const col of cols) {
                formCols.push(col(getFieldDecorator));
            }
            return (<Form style={style}>
                <Row gutter={24}>
                    {formCols}
                </Row>
            </Form>);
        };
    },
    transformNormal(field, schemaProperty, data) {
        switch (field["ui:dataType"]) {
            case 'int':
                return this.formItemWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <InputNumber size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'float':
                return this.formItemWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <InputNumber step={0.01} size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'datetime':
                return this.formItemWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={field.placeholder || '请选择日期'} />
                ), field);
            default:  // 默认就是普通的输入框
                return this.formItemWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <Input {...field["ui:options"]} />
                ), field);
        }
    },
    transformCascader(field, schemaProperty, data) {
        //处理需要远程获取的数据
        if (fielf["ui:remoteConfig"]) {
           const {apiKey,hand}=fielf["ui:remoteConfig"];
        }
        return this.formItemWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: data })(
            <Cascader {...field["ui:options"]} />
        ), field);
    },
    formItemWrapper(formItem, field) {
        return getFieldDecorator => (
            <FormItem key={field.key} label={field["ui:title"]} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {formItem(getFieldDecorator)}
            </FormItem>
        );
    }
}
export default SchemaUtils;