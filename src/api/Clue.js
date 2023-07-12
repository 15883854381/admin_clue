import request from "@/utils/request";

export function CLue_list(data) {
    return request({
        method: 'post',
        url: '/AdminClue/Clue_list',
        data
    })
}

// 修改状态
export function EditClueFlag(data) {
    return request({
        method: 'post',
        url: '/AdminClue/EditClueFlag',
        data
    })
}

// 获取订单总的数量
export function ClueCount(data) {
    return request({
        method: 'post',
        url: '/AdminClue/ClueCount',
        data
    })
}

// 批量上传
export function batchUpData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/batchUp',
        data
    })
}

// 批量上传 文件
export function SelectUpData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/SelectUpdata',
        data
    })
}

// 批量上传 数据
export function queryBatchData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/queryBatch',
        data
    })
}

// 线索均分 给客服
export function Clue_allocationData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/Clue_allocation',
        data
    })
}

// 权限 线索审核列表
export function Clue_list_AuditData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/Clue_list_Audit',
        data
    })
}

// 拨打电话
export function Clue_CallPhoneData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/Clue_CallPhone',
        data
    })
}

// 完善线索数据
export function EditClueDataData(data) {
    return request({
        method: 'post',
        url: '/AdminClue/EditClueData',
        data
    })
}
// 获取单条线索的 tages
export function singularTagsData(data){
    return request({
        method: 'post',
        url: '/AdminClue/singularTags',
        data
    })
}

// 获取外呼录音
export function taskData(data){
    return request({
        method: 'post',
        url: '/Telecord/task',
        data
    })
}

// 批量审核
export function BatchaudiData(data){
    return request({
        method: 'post',
        url: '/AdminClue/Batchaudi',
        data
    })
}
