// 导入登录接口
import {
    batchUpData,
    Clue_allocationData,
    CLue_list, Clue_list_AuditData,
    ClueCount, EditClueDataData,
    EditClueFlag,
    queryBatchData,
    SelectUpData, singularTagsData, taskData
} from "@/api/Clue";
import {Message} from 'element-ui'
import fa from "element-ui/src/locale/lang/fa";
import {getFlagSuccessData} from "@/api/user";

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
        // 确认分配
        a_queryAllocation(store, context) {
            Clue_allocationData({userid: store.state.distribution_form.staff_list.toString()}).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.state.dialog.Clue_distribution = false
                }
            })
        },
        // 线索列表
        Clue_list_Audit(store, context) {
            Clue_list_AuditData(context).then(res => {
                let {code, data, mes} = res.data
                if (code === 200) {
                    store.commit("Clue_list_Audit", data)
                }
            })
        },
        // 线索详情

        // 完善线索
        EditClueData(store, context) {
            EditClueDataData(context).then(res => {
                let {code, mes} = res.data
                Message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    store.commit('EditClueData')
                    store.dispatch('Clue_list_Audit', store.state.pages);
                }
            })
        },
        singularTags(store, context) {
            store.state.tagesMap = []
            singularTagsData(context).then(res => {
                let {code, data} = res.data
                if (code !== 200) return false;
                store.state.tagesMap = data
            })
        },
        // 显示获取录音数据 任务
        task(store) {
            taskData().then(res => {
                store.commit('TASK', res.data.data)

            })
        },
        // 获取成功的所有用户
        getFlagSuccess(store) {
            getFlagSuccessData().then(res => {
                console.log(res)
                store.state.SuccessUser = res.data.data
            })
        }
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
        },
        Clue_list_Audit(state, val) {
            state.outbound_list = val.data
            state.pages.pageCount = val.total
        },
        EditClueData(state, val) {
            state.dialog.ClueEditbox = false
        },
        TASK(state, val) {
            state.CluerecordingData = val
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
            Clue_distribution: false,// 分配线索的 dialog
            ClueEditbox: false,
            recordingTask: false

        },
        distribution_form: {
            staff_list: [],
        }, // 分配表单
        UpDataArray: [],
        outbound_list: [],
        form_clue: {
            user_name: '',
            sex: null,
            cityID: '',
            provinceID: '',
            CartBrandID: '',
            flag: 0,
            notifyurlid: '',
            clue_id: '',
            cart_type: 1,
            tages: []
        },
        tagesMap: [],
        pages: {
            pageCount: 0,
            pageSize: 10,
            pageNumber: 1
        },
        where: {
            phone_number: '',
            flag: '',
        },

        data: {
            BuyCarCityFrom: [],
            phoneData: {},
            tableItem: {},// 表格当前行的数据
        },
        recording: {
            task: '',
            openid: '',
        },// 获取录音的数据
        CluerecordingData: [],
        SuccessUser:[]

    },
    getters: {},
}