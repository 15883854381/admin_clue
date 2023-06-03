import request from "@/utils/request";


export function role_list(){
    return request({
        method:'post',
        url:'/AdminRole/Role_list',
    })
}