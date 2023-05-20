import axios from "../utils/request";


const url = {
    'getCustomer': 'Admincustomer/getCustomer',
    'AddCustomer': 'Admincustomer/AddCustomer',
    'DeleteCustomer': 'Admincustomer/DeleteCustomer',
    'EditCustomerFlag':'Admincustomer/EditCustomerFlag'
}

export function getCustomer(data) {
    return axios({
        method: 'post',
        url: url.getCustomer,
        data
    })
}

export function AddCustomer(data) {
    return axios.post(url.AddCustomer, data, {
        'Content-Type': 'multipart/form-data'
    })
}

export function DeleteCustomer(data) {
    console.log(data)
    return axios({
        method: 'post',
        url: url.DeleteCustomer,
        data
    })
}
export function EditCustomerFlag(data) {
    return axios({
        method: 'post',
        url: url.EditCustomerFlag,
        data
    })
}