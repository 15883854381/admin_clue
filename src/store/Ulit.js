// 导入登录接口
import {role_list} from "@/api/role";
import {Message} from "element-ui";
import {CarBrand, SelectnotifyurlData, userTagsData,RoleStateData} from "@/api/Ulit";
import el from "element-ui/src/locale/lang/el";


export default {
    namespaced: true,
    actions: {
        CarBrandData(store) {
            CarBrand().then(res => {
                store.commit('CarBrandData', res.data.data)
            })
        },
        // 通话录音
        SelectnotifyurlData(store, context) {
            SelectnotifyurlData(context).then(res => {
                res.data.data.filter((item) => {
                    if (item.flag === 1) {

                        store.rootState.clue.form_clue.notifyurlid = item.id
                        store.rootState.clue.data.phoneData = item
                    }
                    return item.flag === 1
                })
                store.commit('SelectnotifyurlData', res.data.data)
            })
        },
        // 获取线上标签
        userTags(store) {
            userTagsData().then(res => {
                store.commit('userTags', res.data.data)
            })
        },
        // 获取用户是否哪个角色
        RoleState(store) {
            RoleStateData().then(res => {
                let {code, data, mes} = res.data
                if (code !== 200) {
                    Message.error(mes)
                    return false;
                }

                if (data.authority === 1 || data.authority === 2) {
                    store.commit('ROLESTATE', true)
                } else {
                    store.commit('ROLESTATE', false)
                }
            })
        }

    },
    mutations: {
        CarBrandData(state, val) {
            state.CarBrandList = val
        },
        SelectnotifyurlData(state, val) {
            state.recordingData = val
        },
        userTags(state, val) {
            state.userTags_list = val
        },
        ROLESTATE(state, val) {
            state.RoleStateData = val
        }


    },
    state: {
        CarBrandList: [],
        recordingData: [], // 录音
        userTags_list: [],
        RoleStateData: false
    },
    getters: {},
}