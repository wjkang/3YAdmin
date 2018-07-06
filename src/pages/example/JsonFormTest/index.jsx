import React from 'react';
import { Card, Row, Col } from 'antd';
import SearchForm from './SearchForm';

class PermissionTest extends React.PureComponent {

    render() {
        console.log("PermissionTest render")
        return (
            <div>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }} title='查询表单'>
                            <SearchForm />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default PermissionTest;