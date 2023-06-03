// 导入登录接口
import {
    addAdminUserData,
    deleteAdminUserData,
    EditAdminUserData,
    SelectAllAdminUserData,
    SelectCustomerUserData, supportStaffData
} from "@/api/user";
import {Message} from "element-ui";


export default {
    namespaced: true,
    actions: {
        SelectAllAdminUser(store) {
            SelectAllAdminUserData().then(res => {
                let {code, data} = res.data
                if (code === 200) {
                    store.commit('SelectAllAdminUser', data)
                }

            })
        },
        // 删除人员用户
        A_deleteAdminUser(store, context) {
            deleteAdminUserData(context).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.commit('A_deleteAdminUser', context)
                }
            })
        },
        //确认上传
        onSubmit(store) {
            const fromData = new FormData();
            for (let item in store.state.form) {
                fromData.append(item, store.state.form[item])
            }
            addAdminUserData(store.state.form).then(res => {
                let {code, mes} = res.data

                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    setTimeout(() => {
                        store.state.dialog.upUser = false
                        location.reload()
                    }, 1000)

                }
            })
        },
        // 查询客服信息
        SelectCustomerUser(store, context) {
            if (context.authority === 3) {
                SelectCustomerUserData(context).then(res => {
                    let {code, data} = res.data
                    store.commit('SelectCustomerUser', {...data, ...context})

                })
            } else {
                store.commit('SelectCustomerUser', context)
            }

        },
        // 修改人员数据
        EditAdminUser(store) {
            const fromData = new FormData();
            for (let item in store.state.form) {
                fromData.append(item, store.state.form[item])
            }
            EditAdminUserData(fromData).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })

                setTimeout(() => {
                    store.state.dialog.upUser = false
                    location.reload()
                }, 1000)
            })
        },
        // 获取客服列表
        supportStaff(store) {
            supportStaffData().then(res => {
                let {code, data} = res.data
                console.log(data)
                if (code === 200) {
                    store.commit('supportStaff', data)
                }
            })
        },
    },
    mutations: {
        SelectAllAdminUser(state, val) {
            state.person_list = val
        },
        A_deleteAdminUser(state, val) {
            state.person_list.splice(val.index, 1)
        },
        SelectCustomerUser(state, val) {
            state.form = {...state.form, ...val}
        },
        supportStaff(state, val) {
            state.support_staff_list = val
        }

    },
    state: {
        person_list: [],
        dialog: {
            upUser: false
        },
        form: {
            username: '',
            phone_number: '',
            password: '',
            authority: '',
            region: '',
            nickname: '',
            WatchCode: '',
        },
        support_staff_list: [],
    },
    getters: {},
}