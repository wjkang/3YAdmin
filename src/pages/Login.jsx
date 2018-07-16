import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Card } from 'antd';
import '@/style/login.less';
//import noise from '@/utils/noise';
import { loginByUsername } from 'api';
import logo from '@/logo.svg';
import { setToken, getToken } from '@/utils/token'

const FormItem = Form.Item;
const { Meta } = Card;

class Login extends React.PureComponent {
    state = {
        loading: false
    }
    startLogin = () => {
        this.setState({ loading: true });
    }
    endLogin = () => {
        this.setState({ loading: false });
    }
    handleSubmit = (e) => {
        const { history } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.startLogin();
                const userName = values.userName;
                const password = values.password;
                try {
                    let res = await loginByUsername(userName, password);
                    const data = res.data;
                    setToken(data.accessToken);
                }
                catch (e) {

                }
                setTimeout(() => {
                    this.endLogin();
                    history.push('/');
                }, 2000);
            }
        });
    }
    componentWillMount() {
        const { history } = this.props;
        let token = getToken();
        if (token) {
            history.push('/');
        }
    }
    componentDidMount() {
        //noise.Init();
        setTimeout(() => {
            let loading = document.getElementById("StartLoading");
            loading && document.body.removeChild(loading);
        }, 200);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const form = <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem
                hasFeedback
            >
                {getFieldDecorator('userName', {
                    initialValue: 'admin',
                    rules: [{ required: true, message: '请输入登录账号!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>
            <FormItem
                hasFeedback
            >
                {getFieldDecorator('password', {
                    initialValue: '123',
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
                    登录
            </Button>
            </FormItem>
        </Form>;
        return (
            <div className="login-container">
                <canvas id="noise-canvas"></canvas>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                        <Card
                            hoverable
                            bordered={false}
                            cover={<div style={{padding:10}}><img alt="logo" src={logo} />{form}</div>}
                        >
                            <Meta
                                avatar={<Icon type="ant-design" style={{ color: '#1890ff', fontSize: 28 }} />}
                                title="3YAdmin"
                                description="专注通用权限控制与表单的后台管理系统模板"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(Login)

