import axios from "axios"
import router from "@/router";

const config = {
    baseURL: process.env.NODE_ENV === "production" ? `http://s.199909.xyz/` : "http://h.199909.xyz/",  // 线上 or 开发,
    timeout: 60 * 1000,
    headers: {
        "token": localStorage.getItem('token')
    },
}

const serve = axios.create(config)

// 添加请求拦截器
serve.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['token'] = localStorage.getItem('token') // 可以全局设置接口请求header中带token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
serve.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    let {data, mes} = response.data
    if (mes === '登录过期，请重新登录') {
        router.replace('/login')
        // return false;
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default serve;