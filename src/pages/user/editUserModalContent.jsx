import React from 'react';
import CommonForm from '@/schema/CommonForm';
class EditUserModalContent extends React.PureComponent {
    onOk = () => {
        this.editForm.handleSubmit();
    }
    render() {
        return (
            <div>
                <CommonForm
                    ref={(instance) => { this.editForm = instance; }}
                    schema={this.props.schema}
                    uiSchema={this.props.uiSchema}
                    formData={this.props.formData}
                    handleSubmit={this.props.handFormSubmit}
                />
            </div>
        )
    }
}

export default EditUserModalContent;