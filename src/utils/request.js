import axios from "axios";
import {Message} from "element-ui";
import {getToken , getName} from "./cookie.js";
const BASEURL = process.env.NODE_ENV  == "production" ? "" : "/api";

const server = axios.create({
    baseURL: BASEURL,
    timeout: 15000
})

//添加请求拦截器
server.interceptors.request.use(function (config) {
  
    config.headers["Tokey"] = getToken()
    config.headers["UserName"] = getName()
    return config
} , function (error) {
    return Promise.reject(error)
})

//添加响应拦截器


server.interceptors.response.use(function (response) {
    let data = response.data
    if (data.resCode !== 0) {
        
        Message.error(data.message)
        return Promise.reject(error)
    } else {
        Message(data.message)
        return response
    }
  
} , function (error) {
    return Promise.reject(error)
})

export default server