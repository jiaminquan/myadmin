import React, { Component,Fragment } from "react";
import { Form, Input, Button , Row, Col} from 'antd';
import { UserOutlined ,LockOutlined ,BarcodeOutlined} from '@ant-design/icons';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onFinish =(values) => {
    console.log('Received values of form: ', values);
  };

  toggleForm=()=>{
    this.props.switchForm("register")
  }

  render() {
    return (
      <Fragment>
        <div className="form-header">
        <h4 className="column">登录</h4>
        <span onClick={this.toggleForm}>账号注册</span>
      </div>
      <div className="form-content">
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={()=>this.onFinish}>

      <Form.Item name="username" rules={[{required: true, message: '请输入账号!',},]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号!" />
      </Form.Item>

      <Form.Item name="password" rules={[{required: true, message: '请输入密码!',},]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码!" />
      </Form.Item>

      <Form.Item name="yzm" rules={[{required: true, message: '请输入验证码!',},]}>
        <Row gutter={13}>
          <Col span={16}>
          <Input prefix={<BarcodeOutlined  className="site-form-item-icon" />} placeholder="请输入验证码!" />
          </Col>
          <Col span={8}>
          <Button type="primary" danger>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
      </Form.Item>
    </Form>
    </div>
    </Fragment>
    )
  }
}

export default LoginForm;