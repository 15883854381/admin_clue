import request from "@/utils/request"


// 定义方法接口

export function getuser(data) {
    return request({
        url: "/compUnit/getAll",
        method: "get",
        data
    })
}

/**
 * 发送验证码
 * phone_number
 */
export function sendCode(data) {
    return request({
        url: '/Ulits/sendcode',
        method: 'post',
        data
    })
}

/**
 *登录验证
 * code
 * phone_number
 */
export function login(data) {
    return request({
        url: '/AdminLogin/login',
        method: 'post',
        data
    })
}

/**
 * 获取所有的用户信息
 * @returns {*}
 */
export function getUserAll(data) {
    return request({
        url: '/AdminUser/getUserAll',
        method: 'post',
        data
    })
}

/**
 * 修改用户状态
 * @returns {*}
 * @constructor
 */
export function editUserFlas(data) {
    return request({
        url: '/AdminUser/EditUserFlas',
        method: 'post',
        data
    })
}

/**
 * 获取单个用户的审核信息
 * @returns {*}
 * @constructor
 */
export function getEnevtUserProcessData(data) {
    return request({
        url: '/AdminUserProcess/getEnevtUserProcess',
        method: 'post',
        data
    })
}

// 获取所有的人员数据
export function SelectAllAdminUserData() {
    return request({
        url: '/AdminUser/SelectAllAdminUser',
        method: 'post',
    })
}

// 删除人员
export function deleteAdminUserData(data) {
    return request({
        url: '/AdminUser/deleteAdminUser',
        method: 'post',
        data
    })
}

// 新增人员
export function addAdminUserData(data) {
    return request({
        url: '/AdminUser/addAdminUser',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 查询客服人员的详情数据
export function SelectCustomerUserData(data) {
    return request({
        url: '/AdminUser/SelectCustomerUser',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


// 修改人员数据
export function EditAdminUserData(data) {
    return request({
        url: '/AdminUser/EditAdminUser',
        method: 'post',
        data,
    })
}

// 获取所有客服列表
export function supportStaffData(){
    return request({
        url:'/AdminUser/supportStaff',
        method:'post',
    })
}