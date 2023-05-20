// 导入登录接口
import {CLue_list, ClueCount, EditClueFlag} from "@/api/Clue";
import {Message} from 'element-ui'

export default {
    namespaced: true,
    actions: {
        CLue_list(store, content) {
            CLue_list(content).then(res => {
                if (res.data.code !== 200) {
                    Message({
                        type: 'error',
                        message: res.data.mes
                    })
                } else {
                    store.commit('CLUE_LIST', res.data.data)
                }
            })
        },
        EditClueFlag(store, context) {
            return EditClueFlag(context).then(res => {

                if (res.data.code !== 200) {
                    store.state.Editstate = false
                    Message({
                        type: 'error',
                        message: res.data.mes
                    })

                } else {
                    store.state.Editstate = true
                    Message({
                        type: 'success',
                        message: res.data.mes
                    })

                }
            })
        },
        ClueCountData(store) {
            ClueCount().then(res => {
                store.commit('ClueCount', res.data.data.count);
            })
        }
    },
    mutations: {
        CLUE_LIST(state, val) {
            console.log(val)
            state.clue_list = val.data
            state.page.pageCount = val.count
        },
        ClueCount(state, val) {
            console.log(state.page)
            state.page.pageCount = val
        }
    },
    state: {
        clue_list: [],
        Editstate: null,
        page: {
            pageSize: 10,
            pageNumber: 1,
            pageCount: 0
        },
    },
    getters: {},
}