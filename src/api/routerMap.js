import request from "@/utils/request";

export function upRouter(data){
    return request({
        method:'post',
        url:'/Adminrouter/setRouter',
        data,
    })
}

