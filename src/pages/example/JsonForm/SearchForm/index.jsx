import React from 'react';
import { Card, Row, Col } from 'antd';
import SearchForm from './SearchForm';

class FormTest extends React.PureComponent {

    render() {
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
export default FormTest;