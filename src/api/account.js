import service from '../../src/utils/request';

//登陆接口

export function Login(data){
  return service.request({
    url:"/login/",
    method:"post",
    // params:data, //类型为get时
    data,  //post时
  })
}

//验证码

export function GetCode(data){
  return service.request({
    url:"/getSms/",
    method:"post",
    // params:data, //类型为get时
    data,  //post时
  })
}

export function Register(data){
  return service.request({
    url:"/register/",
    method:"post",
    // params:data, //类型为get时
    data,  //post时
  })
}

