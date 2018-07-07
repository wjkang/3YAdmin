import React from 'react';
import util from './dynamicFormSchemaUtil';
class DynamicForm extends React.PureComponent {
    handleSubmit = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                // 还是要交给上层组件处理
                this.props.handleSubmit(values);
            }
        });
        //const obj = this.formRef.props.form.getFieldsValue();
    }
    handleReset = () => {
        this.formRef.props.form.resetFields();
    }
    render() {
        console.log("DynamicForm render");
        const { schema, uiSchema, formData, style, toggleParseSchema } = this.props;
        // 根据当前的schema, 获取对应的表单组件
        const FormComponent = util.getForm(schema, uiSchema);

        return (
            <div style={style}>
                <FormComponent toggleParseSchema={toggleParseSchema} schema={schema} uiSchema={uiSchema} formData={formData} wrappedComponentRef={(instance) => { this.formRef = instance; }} />
            </div>
        );
    }
}
export default DynamicForm;