import React from 'react';
import { Card, Row, Col } from 'antd';
import DynamicForm from './DynamicForm';

class FormTest extends React.PureComponent {

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }} title='动态表单'>
                            <DynamicForm />
                        </Card>
                    </Col>
                </Row>
            </div>
        ) 
    }
}
export default FormTest;