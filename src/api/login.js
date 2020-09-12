import server from "../utils/request.js"


/*
获取验证码
*/
export function getSms (data) {
    return server.request({
       method: "post",
       url: "/getSms/",
       data: data
    })
}
/**
 * 注册
 */
export function Register (data) {
    return server.request({
        method: "post",
        url: "/register/",
        data: data
    })
}
/**
 * 
 * 登录
 */
export function Login (data) {
    return server.request({
        method: "post",
        url: "/login/",
        data: data
    })
}

