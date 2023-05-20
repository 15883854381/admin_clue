import axios from '../utils/request'

const url = {
    'OrderDatas': 'AdminOrder/OrderDatas',
    'EditOrderFlat': 'AdminOrder/EditOrderFlat',
    'Selectnotifyurl': 'AdminOrder/Selectnotifyurl',
    'OrderCount': "AdminOrder/OrderCount"

}

export function OrderDatas(data) {
    return axios.post(url.OrderDatas, data)
}

export function EditOrderFlat(data) {
    return axios.post(url.EditOrderFlat, data)
}

export function Selectnotifyurl(data) {
    return axios.post(url.Selectnotifyurl, data)
}

// 获取订单数据总量
export function OrderCount(data) {
    return axios.post(url.OrderCount, data)
}
