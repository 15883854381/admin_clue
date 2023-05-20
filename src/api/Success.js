import axios from '../utils/request'

const url = {
    DeleteCase: 'Success/DeleteCase',
    AddCase: 'Success/AddCase',
    SelectCase: 'Success/SelectCase',
    EditCase: 'Success/EditCase',
}

// 删除
export function DeleteCase(data) {
    return axios.post(url.DeleteCase, data)
}

// 新增
export function AddCase(data) {
    return axios.post(url.AddCase, data)
}

// 新增
export function SelectCase(data) {
    return axios.post(url.SelectCase, data)
}

// 修改
export function EditCase(data) {
    return axios.post(url.EditCase, data)
}