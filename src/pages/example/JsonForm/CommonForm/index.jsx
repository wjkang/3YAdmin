import React from 'react';
import { Card, Row, Col } from 'antd';
import CommonForm from './CommonForm';

class PermissionTest extends React.PureComponent {

    render() {
        console.log("PermissionTest render")
        return (
            <div>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }} title='动态表单'>
                            <CommonForm />
                        </Card>
                    </Col>
                </Row>
            </div>
        ) 
    }
}
export default PermissionTest;