// 导入登录接口
import {batchUpData, CLue_list, ClueCount, EditClueFlag, queryBatchData, SelectUpData} from "@/api/Clue";
import {Message} from 'element-ui'
import fa from "element-ui/src/locale/lang/fa";

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
        },
        // 批量上传
        UpdateExcel(store, context) {
            const fromdata = new FormData();
            fromdata.append('file', context.raw)
            batchUpData(fromdata).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.state.dialog.excel_box = false;
                    store.state.dialog.Data_box = true
                    store.dispatch('SelectUpDatas')
                }


            })
        },
        SelectUpDatas(store, context) {
            SelectUpData().then(res => {
                let {mes, code, data} = res.data

                if (code !== 200) {
                    Message({
                        type: 'error',
                        message: mes
                    })
                    return false;
                }
                store.commit('BeforeUpDatas', data);
            })
        },
        queryBatch(store, context) {
            queryBatchData({data: context.toString(), type: 1}).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.state.dialog.Data_box = false
                }
            })
        },
    },

    mutations: {
        CLUE_LIST(state, val) {
            state.clue_list = val.data
            state.page.pageCount = val.count
        },
        ClueCount(state, val) {
            state.page.pageCount = val
        },
        BeforeUpDatas(state, val) {
            state.UpDataArray = val


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
        dialog: {
            Data_box: false,
            excel_box: false,
        },
        UpDataArray: []
    },
    getters: {},
}