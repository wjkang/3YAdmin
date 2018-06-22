import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import commonFormSchemaUtil from './commonFormSchemaUtil';
class CommonForm extends React.PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        const obj = this.formRef.props.form.getFieldsValue();

        // 还是要交给上层组件处理
        this.props.handleSubmit(obj);
    }
    handleReset = (e) => {
        e.preventDefault();
        this.formRef.props.form.resetFields();
    }
    render() {
        console.log("CommonForm render");
        const { schema, uiSchema, formData } = this.props;

        // 根据当前的schema, 获取对应的表单组件
        const FormComponent = commonFormSchemaUtil.getForm(schema, uiSchema, formData);

        return (
            <div>
                <FormComponent style={{ display: this.state.expand ? 'inline' : 'none' }} wrappedComponentRef={(instance) => { this.formRef = instance; }} />
            </div>
        );
    }
}
export default CommonForm;