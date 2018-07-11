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
                case 'inputNumber':
                    cols.push(util.transformInputNumber(field, schemaProperty));
                    break;
                case 'checkbox':
                    cols.push(util.transformCheckbox(field, schemaProperty));
                    break;
                case 'datetime':
                    cols.push(util.transformDatetime(field, schemaProperty));
                    break;
                case 'radio':
                    cols.push(util.transformRadio(field, schemaProperty));
                    break;
                case 'select':
                    cols.push(util.transformSelect(field, schemaProperty));
                    break;
                case 'switch':
                    cols.push(util.transformSwitch(field, schemaProperty));
                    break;
                case 'cascader':
                    cols.push(util.transformCascader(field, schemaProperty));
                    break;
                case 'between':
                    cols.push(util.transformBetween(field, schemaProperty));
                    break;
                default:
                    cols.push(util.transformInput(field, schemaProperty));
            }
        });

        return (getFieldDecorator, style) => {
            const formCols = [];
            for (const col of cols) {
                formCols.push(col(getFieldDecorator));
            }
            return (
                <Form style={style}>
                    <Row gutter={24}>
                        {formCols}
                    </Row>
                </Form>
            );
        };
    },
    transformInput(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <Input {...field["ui:options"]} />
        ), field);
    },
    transformInputNumber(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <InputNumber {...field["ui:options"]} />
        ), field);
    },
    transformCheckbox(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <Checkbox.Group {...field["ui:options"]} />
        ), field);
    },
    transformDatetime(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <DatePicker {...field["ui:options"]} />
        ), field);
    },
    transformRadio(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <Radio.Group {...field["ui:options"]} />
        ), field);
    },
    transformSelect(field, schemaProperty) {
        let dataOptions = field["ui:dataOptions"] || []
        let options = [];
        for (let o of dataOptions) {
            options.push(<Select.Option key={o.value} value={o.value} disabled={o.disabled}>{o.title}</Select.Option>)
        }
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <Select {...field["ui:options"]}>
                {options}
            </Select>
        ), field);
    },
    transformSwitch(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {
            initialValue: field["ui:defaultValue"],
            valuePropName: 'checked'
        }
        )(
            <Switch {...field["ui:options"]} />
        ), field);
    },
    transformCascader(field, schemaProperty) {
        return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, { initialValue: field["ui:defaultValue"] })(
            <Cascader {...field["ui:options"]} />
        ), field);
    },
    transformBetween(field, schemaProperty) {
        let begin, end;
        switch (field["ui:type"]) {
            case 'number':
                begin = getFieldDecorator => {
                    return (
                        getFieldDecorator(`${field.key}Begin`, { initialValue: field["ui:defaultBeginValue"] })(<InputNumber {...field["ui:options"]} />)
                    );
                };
                end = getFieldDecorator => {
                    return (
                        getFieldDecorator(`${field.key}End`, { initialValue: field["ui:defaultEndValue"] })(<InputNumber {...field["ui:options"]} />)
                    );
                };
                return this.betweenColWrapper(begin, end, field);
            default:
                begin = getFieldDecorator => {
                    return (
                        getFieldDecorator(`${field.key}Begin`, { initialValue: field["ui:defaultBeginValue"] })(<DatePicker {...field["ui:options"]} />)
                    );
                };
                end = getFieldDecorator => {
                    return (
                        getFieldDecorator(`${field.key}End`, { initialValue: field["ui:defaultEndValue"] })(<DatePicker {...field["ui:options"]} />)
                    );
                };
                return this.betweenColWrapper(begin, end, field);
        }
    },
    colWrapper(formItem, field) {
        let lgCol = 6;
        let xlCol = 6;
        if (field["ui:widget"] === 'checkbox' || field["ui:widget"] === 'radio' || field["ui:widget"] === 'between') {
            lgCol = 12;
            xlCol = 12;
        }
        return getFieldDecorator => (
            <Col key={field.key} xs={24} sm={24} md={12} lg={lgCol} xl={xlCol}>
                <FormItem key={field.key} label={field["ui:title"]} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {formItem(getFieldDecorator)}
                </FormItem>
            </Col>
        );
    },
    betweenColWrapper(beginFormItem, endFormItem, field) {
        return getFieldDecorator => (
            <Col key={`${field.key}Begin`} xs={24} sm={24} md={12} lg={12} xl={12}>
                <Row>
                    <Col xs={24} sm={24} md={16}>
                        <FormItem key={`${field.key}Begin`} label={field["ui:title"]} labelCol={{ span: 15 }} wrapperCol={{ span: 9 }}>
                            {beginFormItem(getFieldDecorator)}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <FormItem key={`${field.key}End`}>
                            {endFormItem(getFieldDecorator)}
                        </FormItem>
                    </Col>
                </Row>
            </Col>
        );
    }

}

export default SchemaUtils;