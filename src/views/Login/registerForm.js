import React, { Component,Fragment } from "react";
import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined ,BarcodeOutlined } from '@ant-design/icons';
import { GetCode , Register } from "../../api/account";
class registerForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      code_button_loading: false,
      code_button_disabled: false,
      code_button_text: "获取验证码"
    };
  }

  getCode = () => {
    if (!this.state.username) {
      message.error('邮箱不存在', 1);
      return false
    }
    this.setState({
      code_button_loading: true,
      code_button_text: "发送中"
    })
    const requestData = {
      username: this.state.username,
      module: "register"
    }
    GetCode(requestData).then(response => {
      message.success('验证码已发送', 1);
      this.countDown()
    }).catch(error => {
      this.setState({
        code_button_loading: false,
        code_button_text: "重新获取"
      })
    })
  }

  register=()=>{
    const registerData = {
      username: this.state.username,
      password:this.state.password,
      code:this.state.code
    }
    Register(registerData).then(response => {
      message.success('注册成功', 1);

    }).catch(error => {
      message.error('注册失败', 1);

    })
  }

  countDown = () => {
    let timer = null;
    let sec = 60;
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec}S`
    })
    timer = setInterval(() => {
      sec--
      if(sec<=0){
        this.setState({
          code_button_text: `重新获取`,
          code_button_disabled: false
        })
        clearInterval(timer);
        return false
      }
      this.setState({
        code_button_text: `${sec}S`
      })
  }, 1000)
}

inputChange = (e) => {
  let value = e.target.value;
  this.setState({
    username: value,
  })
}
inputChange2 = (e) => {
  let value = e.target.value;
  this.setState({
    password:value,
  })
}
inputChange3 = (e) => {
  let value = e.target.value;
  this.setState({
    code:value
  })
}

  onFinish =(values) => {
    console.log('Received values of form: ', values);
  };
  toggleForm=()=>{
    this.props.switchForm("login")
  }

  render() {
    const { username,password, code,code_button_loading, code_button_text, code_button_disabled } = this.state;
    return (
      <Fragment>
        <div className="form-header">
        <h4 className="column">账号注册</h4>
        <span onClick={this.toggleForm}>登录</span>
      </div>
      <div className="form-content">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={() => this.onFinish}>

          <Form.Item name="username" rules={[{ required: true, message: '请输入账号!', },]}>
            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号!" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!', },]}>
            <Input value={password} onChange={this.inputChange2} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码!" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请再次确认密码!', },]}>
            <Input value={password} onChange={this.inputChange2} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码!" />
          </Form.Item>

          <Form.Item name="code" rules={[
            { required: true, message: '请输入验证码!' },
            { len: 6, message: '请输入6位验证码' }
          ]}>
            <Row gutter={13}>
              <Col span={16}>
                <Input value={code} onChange={this.inputChange3} prefix={<BarcodeOutlined className="site-form-item-icon" />} placeholder="请输入验证码!" />
              </Col>
              <Col span={8}>
                <Button type="primary" danger disabled={code_button_disabled} loading={code_button_loading} onClick={this.getCode} >{code_button_text}</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.register} block>注册</Button>
          </Form.Item>
        </Form>
      </div>
      </Fragment>
    )
  }
}

export default registerForm;