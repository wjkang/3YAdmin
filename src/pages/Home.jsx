import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Row, Col, Tooltip, Popconfirm, notification } from 'antd';
import logo from '@/logo.svg';
import '@/style/home.less';
import { resetDb } from 'api';

const { Meta } = Card;


class Home extends React.PureComponent {
    resetDb = async () => {
        await resetDb();
        notification.success({
            message: '初始化成功',
            placement: 'bottomRight'
        });
        setTimeout(() => {
            document.location.reload()
        }, 2000);
    }
    render() {
        console.log("Home render")
        let logAction = <Tooltip title="访问记录"><Link to={'/app/requestlog'}><Icon type="area-chart" /></Link></Tooltip>;
        let resetActions = <Popconfirm placement="right" title="确定初始化?" onConfirm={() => this.resetDb()}>
            <Tooltip title="初始化数据">
                <Icon type="sync" />
            </Tooltip>
        </Popconfirm>;

        return (

            <Row type="flex" justify="center" align="middle" style={{ height: '100%', marginTop: 100 }}>
                <Col>
                    <Card
                        hoverable
                        bordered={false}
                        cover={<img alt="logo" src={logo} />}
                        actions={[logAction, resetActions]}
                    >
                        <Meta
                            avatar={<Icon type="ant-design" style={{ color: '#1890ff', fontSize: 28 }} />}
                            title="3YAdmin"
                            description="专注通用权限控制与表单的后台管理系统模板"
                        />
                    </Card>

                </Col>
            </Row>

        )
    }
}

export default Home;