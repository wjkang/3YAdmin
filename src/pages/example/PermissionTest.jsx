import React from 'react';
import { Card, Row, Col, Switch, Button, notification } from 'antd';
import PermissionContainer from 'permission';
import { getTopPostByQuery } from 'api';

class PermissionTest extends React.PureComponent {
    state = {
        isAdmin: true,
        loading: false
    }
    adminPermissionToggle = (checked) => {
        localStorage.setItem("isAdmin", checked ? 1 : 0)
        //通过setState触发render
        this.setState({
            isAdmin: checked
        })
    }
    doFetch = async () => {
        this.setState({
            loading: true
        })
        try {
            await getTopPostByQuery({});
            notification.success({
                placement: 'bottomLeft bottomRight',
                message: '请求成功',
            });
        } catch (e) {
            if (e == '403') {
                notification.error({
                    placement: 'bottomLeft bottomRight',
                    message: '请求被拦截',
                });
            }
            console.log(e)
        }
        this.setState({
            loading: false
        })
    }
    render() {
        console.log("PermissionTest render")
        return (
            <div>
                <Row>
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Switch checkedChildren="有admin权限" unCheckedChildren="无admin权限" defaultChecked onChange={this.adminPermissionToggle} />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '100%', marginTop: 20 }} title="元素级权限控制">
                            <p>当没有admin权限的时候,权限按钮不可见</p>
                            <Button type="primary">正常按钮</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <PermissionContainer permission={["xxoo"]}>
                                <Button>权限按钮</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="dashed">权限按钮</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="danger">权限按钮</Button>
                            </PermissionContainer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '100%', marginTop: 20 }} title="接口级权限控制">
                            <p>当没有admin权限的时候,请求相应接口时,直接拦截请求,F12进行查看</p>
                            <Button type="primary" loading={this.state.loading} onClick={this.doFetch}>
                                发起请求
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '100%', marginTop: 20 }} title="菜单级权限控制">
                            <p>后端返回的菜单都是已经在后端经过权限过滤的,保存在redux中</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default PermissionTest;