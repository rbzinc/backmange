import instance from '@/utils/index.js';

//发送登录请求
export const userLoginService = (username, password,code,codeKey) => instance({
    url: '/admin/login',
    method: 'post',
    data: {
        username,
        password,
        code,
        codeKey
    }
})

//登录获取验证码图片
export const userLoginCodeService = () => instance({
    url: '/admin/getCode',
    method: 'get',
})

//注册，登录发送验证码
export const userGetCodeService = (email) => instance({
    url: '/admin/login/code',
    method: 'post',
    params:{
        phone:email
    }
})

//发送注册请求
export const userRegisterService = (username, password, email, code) => instance({
    url: '/admin/register',
    method: 'post',
    data:{
        username,
        password,
        email,
        code
    }
})

//获取所有用户的接口
export const getAllusersData = (params) => instance({
    url: "/admin/getAll",
    method: "get",
    params
});

export const postAIData = (params) => instance({
    url: '/admin/command/handle',
    method: 'POST',
    params
});