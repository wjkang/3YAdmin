import React from 'react';
import { Modal } from 'antd';
import CommonForm from '@/schema/CommonForm';


class EditRoleModal extends React.PureComponent {
    onCancel = () => {
        this.props.onCancel();
    }
    onOk = () => {
        this.editForm.handleSubmit();
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                cancelText="关闭"
                okText="提交"
                title={this.props.title}
                onCancel={this.onCancel}
                onOk={this.onOk}
                destroyOnClose
            >
                <CommonForm
                    ref={(instance) => { this.editForm = instance; }}
                    schema={this.props.schema}
                    uiSchema={this.props.uiSchema}
                    formData={this.props.formData}
                    handleSubmit={this.props.handFormSubmit}
                />
            </Modal>
        )
    }
}

export default EditRoleModal;