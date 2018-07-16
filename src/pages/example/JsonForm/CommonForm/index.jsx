import React from 'react';
import { Card, Row, Col } from 'antd';
import CommonForm from './CommonForm';

class FormTest extends React.PureComponent {

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }} title='常规表单'>
                            <CommonForm />
                        </Card>
                    </Col>
                </Row>
            </div>
        ) 
    }
}
export default FormTest;