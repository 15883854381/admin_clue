// 导入登录接口
import {Message} from "element-ui";
import {AdminClueDataListData} from "@/api/myClue";
import {batchUpData, queryBatchData, SelectUpData} from "@/api/Clue";


export default {
    namespaced: true,
    actions: {
        // 获取用户所有的线索
        AdminClueDataList(store, context) {
            AdminClueDataListData(store.state.page).then(res => {
                let {code, data, mes} = res.data
                if (code !== 200) {
                    Message.error(mes)
                    store.state.ClueData = []
                    return false
                }
                store.commit('AdminClueDataList', data)

            })
        },
        // 批量上传 上传excel文件
        UpbatchUp(store) {
            const fromData = new FormData();
            fromData.append('file', store.state.updata.file)
            batchUpData(fromData).then(res => {
                let {code, mes} = res.data
                if (code === 200) {
                    store.dispatch('SelectUp')
                    store.state.dialog.Data_box = true
                }
            })
        },
        // 查询批量上传 的表格数据
        SelectUp(store) {
            SelectUpData().then(res => {
                let {code, data, mes} = res.data
                if (code !== 200) Message.error(mes)
                store.commit('SelectUp', data)
            })
        },
        // 历史数据 界面 单个或批量上传数据
        queryBatch(store, context) {
            queryBatchData(context).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.state.dialog.Data_box = false
                    location.reload()
                }
            })
        },


    },
    mutations: {
        AdminClueDataList(state, val) {
            state.ClueData = val.data
            state.page.PageCount = val.total
        },
        SelectUp(state, val) {
            state.SelectUpData = val
        }
    },
    state: {
        ClueData: [],
        SelectUpData: [],
        page: {
            pageSize: 10,
            pageNumber: 1,
            PageCount: 0
        },
        updata: {file: ''},
        dialog: {
            excel_box: false,
            Data_box: false,
        }
    },
    getters: {},
}