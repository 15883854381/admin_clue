import request from "@/utils/request";

export function upRouter(data){
    return request({
        method:'post',
        url:'/Adminrouter/setRouter',
        data,
    })
}

// 验证用户是否有访问页面的权限
export function permissions_validation_data(data){
    return request({
        method:'post',
        url:'/Adminrouter/permissions_validation',
        data,
    })
}
