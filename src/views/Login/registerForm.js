import React, { Component,Fragment } from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class registerForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onFinish =(values) => {
    console.log('Received values of form: ', values);
  };
  toggleForm=()=>{
    this.props.switchForm("login")
  }

  render() {
    return (
      <Fragment>
        <div className="form-header">
        <h4 className="column">账号注册</h4>
        <span onClick={this.toggleForm}>登录</span>
      </div>
      <div className="form-content">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={() => this.onFinish}>

          <Form.Item name="username" rules={[{ required: true, message: '请输入账号!', },]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号!" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!', },]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码!" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请再次确认密码!', },]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码!" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
          </Form.Item>
        </Form>
      </div>
      </Fragment>
      
     
    )
  }
}

export default registerForm;