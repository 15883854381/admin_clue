// 导入登录接口
import {role_list} from "@/api/role";
import {Message} from "element-ui";
import {CarBrand, SelectnotifyurlData, userTagsData} from "@/api/Ulit";


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
        }
    },
    state: {
        CarBrandList: [],
        recordingData: [], // 录音
        userTags_list: [],
    },
    getters: {},
}