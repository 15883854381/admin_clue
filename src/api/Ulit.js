import request from "@/utils/request";

// 汽车品牌数据
export function City() {
    return request({
        method: 'post',
        url: 'Ulits/city',
    })
}

// 汽车品牌数据
export function CarBrand() {
    return request({
        method: 'post',
        url: 'Ulits/CarBrand',
    })
}

// 获取通话录音
export function SelectnotifyurlData(data) {
    return request({
        method: 'post',
        url: 'AdminOrder/Selectnotifyurl',
        data
    })
}

// 获取所有的tages
export function userTagsData(data){
    return request({
        method: 'post',
        url: 'Ulits/userTags',
        data
    })
}

export function RoleStateData(){
    return request({
        method: 'post',
        url: 'AdminRole/RoleState',
    })
}