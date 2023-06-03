// 导入登录接口
import {role_list} from "@/api/role";
import {Message} from "element-ui";


export default {
    namespaced: true,
    actions: {
        role_listData(store, context) {
            role_list().then(res => {
                let {mes, code, data} = res.data
                if (code === 200) {
                    store.commit('role_listData', data);
                }
            })
        }
    },
    mutations: {
        role_listData(state, val) {
            state.RoleData = val
        }
    },
    state: {
        RoleData: [],
    },
    getters: {},
}