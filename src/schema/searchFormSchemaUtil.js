import React from 'react';
import createClass from 'create-react-class';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    InputNumber
} from 'antd';

const FormItem = Form.Item;

// 暂存的JsxGenerator
const JsxGeneratorMap = new Map();
// 暂存表单组件, key是schema 的$id, value是对应的react组件
const FormMap = new Map();

const SchemaUtils = {
    getForm(schema, uiSchema, noCache) {
        const id = schema["$id"];
        if (FormMap.has(id)) {
            return FormMap.get(id);
        } else {
            const newForm = this.createForm(id, schema, uiSchema, noCache);
            FormMap.set(id, newForm);
            return newForm;
        }
    },
    createForm(id, schema, uiSchema, noCache) {
        console.log("createForm")
        const util = this;
        // 只能用传统的ES5的写法, 函数式(无状态)组件应该也可以, 但是需要生命周期相关方法
        const tmpComponent = createClass({
            componentWillMount() {
                console.log("tmpComponent componentWillMount");
                // 组件初始化时读取schema
                if (JsxGeneratorMap.has(id)) {
                    this.generateJsx = JsxGeneratorMap.get(id);
                    return;
                }
                const generateJsx = util.parse(schema, uiSchema);

                !noCache && JsxGeneratorMap.set(id, generateJsx);

                this.generateJsx = generateJsx;
            },
            render() {
                console.log("tmpComponent render");
                const style = this.props.style;
                if (this.props.noCacheSchema) {
                    //不缓存,每次纯法render,都要进行parse,不推荐
                    const generateJsx = util.parse(this.props.schema, this.props.uiSchema);
                    this.generateJsx = generateJsx;
                }

                // getFieldDecorator一层层往下传递
                return this.generateJsx(this.props.form.getFieldDecorator, style);
            },
        });
        // 注意要再用antd的create()方法包装下
        return Form.create()(tmpComponent);
    },
    parse(schema, uiSchema) {
        console.log("parse schema")
        let cols = [];
        let schemaProperties = schema["properties"];
        const util = this;
        Object.keys(uiSchema).forEach(function (key) {
            let field = uiSchema[key];
            field.key = key;
            const schemaProperty = schemaProperties[key];
            // 注意, 每个字段transform之后, 返回的也都是一个回调函数, 所以cols其实是一个回调函数的集合
            switch (field["ui:widget"]) {
                case 'select':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'radio':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'checkbox':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'multiSelect':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'between':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                case 'cascader':
                    cols.push(util.transformNormal(field, schemaProperty));
                    break;
                default:
                    cols.push(util.transformNormal(field, schemaProperty));
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
    transformNormal(field, schemaProperty) {
        switch (field["ui:dataType"]) {
            case 'int':
                return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <InputNumber size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'float':
                return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <InputNumber step={0.01} size="default" max={field.max} min={field.min} placeholder={field.placeholder} />
                ), field);
            case 'datetime':
                return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={field.placeholder || '请选择日期'} />
                ), field);
            default:  // 默认就是普通的输入框
                return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field.defaultValue })(
                    <Input {...field["ui:options"]} />
                ), field);
        }
    },
    colWrapper(formItem, field) {
        return getFieldDecorator => (
            <Col key={field.key} xs={24} sm={24} md={12} lg={6} xl={6}>
                <FormItem key={field.key} label={field["ui:title"]} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {formItem(getFieldDecorator)}
                </FormItem>
            </Col>
        );
    }
}

export default SchemaUtils;