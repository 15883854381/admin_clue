import request from "@/utils/request";

export function AdminClueDataListData(data){
    return request({
        method:'post',
        url:'Clue/AdminClueDataList',
        data
    })
}