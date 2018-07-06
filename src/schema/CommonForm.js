import React from 'react';
import commonFormSchemaUtil from './commonFormSchemaUtilPlus';
class CommonForm extends React.PureComponent {
    handleSubmit = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                // 还是要交给上层组件处理
                this.props.handleSubmit(values);
            }
        });
        //const obj = this.formRef.props.form.getFieldsValue();
    }
    handleReset = (e) => {
        e.preventDefault();
        this.formRef.props.form.resetFields();
    }
    render() {
        console.log("CommonForm render");
        const { noCacheSchema, schema, uiSchema, formData, style } = this.props;
        // 根据当前的schema, 获取对应的表单组件
        const FormComponent = commonFormSchemaUtil.getForm(schema, uiSchema, noCacheSchema);

        return (
            <div style={style}>
                <FormComponent noCacheSchema={noCacheSchema} schema={schema} uiSchema={uiSchema} formData={formData} wrappedComponentRef={(instance) => { this.formRef = instance; }} />
            </div>
        );
    }
}
export default CommonForm;