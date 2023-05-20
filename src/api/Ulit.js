import request from "@/utils/request";
export function City(){
    return request({
        method:'post',
        url:'Ulits/city',
    })
}

