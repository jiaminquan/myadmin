import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Login, GetCode } from "../../api/account";
import {setToken} from "../../utils/session";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code_button_loading: false,
      code_button_disabled: false,
      code_button_text: "获取验证码",
    };
  }
  //登录
  onFinish = (values) => {
    const loginData = {
      username: this.state.username,
      password:this.state.password,
      code:this.state.code
    }
    Login(loginData).then(response => {
      console.log(response)
      const data = response.data.data
      setToken(data.token)
      //路由跳转
      this.props.history.push('/index')
      message.success('登陆成功', 1);
    }).catch(error => {
      message.error('登陆失败', 1);
    })
    console.log('Received values of form: ', values);
  };
  //获取验证码
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
      module: "login"
    }
    GetCode(requestData).then(response => {
      message.success(response.data.message, 5);
      this.countDown()
    }).catch(error => {
      this.setState({
        code_button_loading: false,
        code_button_text: "重新获取"
      })
    })
  }
  //输入处理
  inputChange = (e) => {
    let value = e.target.value;
    this.setState({
      username: value
    })
  }
  inputChange2 = (e) => {
    let value = e.target.value;
    this.setState({
      password: value
    })
  }
  inputChange3 = (e) => {
    let value = e.target.value;
    this.setState({
      code: value
    })
  }
  //倒计时方法
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
toggleForm = () => {
  this.props.switchForm("register")
}

render() {
  const { username,password,code, code_button_loading, code_button_text, code_button_disabled } = this.state;
  return (
    <Fragment>
      <div className="form-header">
        <h4 className="column">登录</h4>
        <span onClick={this.toggleForm}>账号注册</span>
      </div>
      <div className="form-content">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>

          <Form.Item name="username" rules={[
            { required: true, message: '请输入邮箱!' },
            { type: "email", message: '邮箱格式不正确!' }
          ]}>
            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
          </Form.Item>

          <Form.Item name="password" rules={[
            { required: true, message: '请输入密码!' },
            // ( { getFieldValue} ) => ({
            //   validator(rule, value) {
            //     if (value.length < 6) {
            //       return Promise.reject('不能小于6位');
            //     }else{
            //       return Promise.resolve();
            //     }
            //     // return Promise.reject('The two passwords that you entered do not match!');
            //   },
            // }),
            { min: 6, message: '不能小于6位!' },
            { max: 16, message: '不能大于16位!' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入数字+字母!' }
          ]}>
            <Input value={password} onChange={this.inputChange2} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码!" />
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
            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}
}

export default withRouter (LoginForm);