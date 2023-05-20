import request from "@/utils/request";
export function CLue_list(data){
    return request({
        method:'post',
        url:'/AdminClue/Clue_list',
        data
    })
}
// 修改状态
export function EditClueFlag(data){
    return request({
        method:'post',
        url:'/AdminClue/EditClueFlag',
        data
    })
}
// 获取订单总的数量
export function ClueCount(data){
    return request({
        method:'post',
        url:'/AdminClue/ClueCount',
        data
    })
}
