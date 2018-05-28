import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '@/style/login.less';
import noise from '@/utils/noise';
import { loginByUsername } from 'api';
import { setToken, getToken } from '@/utils/token'

const FormItem = Form.Item;

class Login extends React.Component {
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
        noise.Init();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <canvas id="noise-canvas"></canvas>
                <Row type="flex" justify="center" align="middle">
                    <Col span={4}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入登录账号!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
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
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(Login)

