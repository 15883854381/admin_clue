import {EditOrderFlat, OrderDatas, Selectnotifyurl} from "@/api/order";
import {Message} from "element-ui";
import Vue from "vue";

export default {
    namespaced: true,
    actions: {
        OrderData(state, val) {
            OrderDatas(val).then(res => {
                let {code, data, mes} = res.data;
                if (code !== 200) {
                    Message({
                        type: 'error',
                        message: mes
                    })
                    return false;
                }
                state.commit('ORDERDATA', data)
            })
        },
        EditOrderFlatData(state, val) {
            EditOrderFlat(val).then(res => {
                let {code, data, mes} = res.data;
                Message({
                    type: code !== 200 ? 'error' : 'success',
                    message: mes
                })
                if (code === 200) {
                    // state.state.orderlist[val.index] = val.flat
                    state.commit('EditOrderFlatData', {index: val.index, flat: val.flat})
                }
            })
        },
        SelectnotifyurlData(state, val) {
            Selectnotifyurl(val).then(res => {
                let {code, data, mes} = res.data;
                state.commit('SelectnotifyurlData', data)
            })
        },
    },
    mutations: {
        ORDERDATA(context, val) {
            context.orderlist = val.data
            context.page.pageCount = val.total
        },
        EditOrderFlatData(context, val) {
            context.orderlist[val.index].flat = val.flat
            context.dialog.orderbox = false
        },
        SelectnotifyurlData(context, val) {
            context.notifyurlData = val
        },

    },
    state: {
        orderlist: [],
        dialog: {
            orderbox: false,
        },
        data: {
            itemData: {}
        },
        notifyurlData: [],
        page: {
            pageSize: 10,
            pageNumber: 1,
            pageCount: 0,
        },
        where: {
            order_number: '',
            flat: '',
        }


    },
    getters: {
        new_order_flag(state, getters) {

            let data = [];
            for (let item in state.orderlist) {
                switch (state.orderlist[item].flat) {
                    case 1:
                        Vue.set(state.orderlist[item], 'title', '交易完成')
                        Vue.set(state.orderlist[item], 'type', 'success')
                        break
                    case 2:
                        Vue.set(state.orderlist[item], 'title', "未付款")
                        Vue.set(state.orderlist[item], 'type', "warning")
                        break
                    case 3:
                        Vue.set(state.orderlist[item], 'title', "交易进行中")
                        Vue.set(state.orderlist[item], 'type', "")
                        break
                    case 4:
                        Vue.set(state.orderlist[item], 'title', "已拨打电话")
                        Vue.set(state.orderlist[item], 'type', "info")
                        break
                    case 5:
                        Vue.set(state.orderlist[item], 'title', "申述中")
                        Vue.set(state.orderlist[item], 'type', "info")
                        break
                    case 6:
                        Vue.set(state.orderlist[item], 'title', "申述失败")
                        Vue.set(state.orderlist[item], 'type', "danger")
                        break
                    case 7:
                        Vue.set(state.orderlist[item], 'title', "申述成功")
                        Vue.set(state.orderlist[item], 'type', "success")
                        break
                    case 8:
                        Vue.set(state.orderlist[item], 'title', "交易关闭")
                        Vue.set(state.orderlist[item], 'type', "danger")
                        break
                    case 9:
                        Vue.set(state.orderlist[item], 'title', "退款成功")
                        Vue.set(state.orderlist[item], 'type', "danger")
                        break
                }
                state.orderlist[item].index = item
                data.push(state.orderlist[item])
            }
            return data
        },


    },
}