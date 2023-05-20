import axios from "axios"

const config = {
    baseURL: "http://h.199909.xyz",
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
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default serve;