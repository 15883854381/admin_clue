// 导入登录接口
import {AddCustomer, DeleteCustomer, EditCustomerFlag, getCustomer} from "@/api/Custrom";
import {Message} from "element-ui";


export default {
    namespaced: true, actions: {
        getCustomerData(state) {
            getCustomer().then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    state.commit("GETCUSTOMES", res.data.data)
                } else {
                    Message({
                        type: 'error', message: res.data.mes
                    })
                }

            })
        }, DeleteCustomerData(state, val) {
            DeleteCustomer({id: val.id}).then(res => {
                if (res.data.code === 200) {
                    state.commit("DELETECUSTOMER", val.index)
                }
                Message({
                    type: res.data.code !== 200 ? 'error' : 'success', message: res.data.mes
                })
            })
        }, AddCustomerData(state, val) {
            const {updata} = state.state
            // updata['flag'] = Number(updata['flag'])
            const FromData = new FormData();
            for (let item in updata) {
                if (updata[item] === '') {
                    Message({
                        type: 'error', message: '请输入完整的客户信息'
                    })
                    return false
                }
                if (item === 'flag') {
                    FromData.append('flag', Number(updata['flag']));
                    continue
                }
                FromData.append(item, updata[item]);
            }
            AddCustomer(FromData).then(res => {
                if (res.data.code === 200) {
                    state.commit("ADDCUSTROMER", res.data.data)
                }
                this.$router.go(0);

                Message({
                    type: res.data.code !== 200 ? 'error' : 'success', message: res.data.mes
                })
            })
        },

        EditFlag(state, val) {
            EditCustomerFlag({...val, flag: Number(!val.flag)}).then(res => {
                if (res.data.code === 200) {
                    state.commit("FlagType", val)
                }
                Message({
                    type: res.data.code !== 200 ? 'error' : 'success', message: res.data.mes
                })
            })
        }

    }, mutations: {
        GETCUSTOMES(context, val) {
            context.customer = val
        },
        DELETECUSTOMER(context, val) {
            // delete context.customer[val]
            context.customer.splice(val, 1)
            console.log(context)
        },
        ADDCUSTROMER(context, val) {
            context.BoxShow = false;
            for (let item in context.updata) {
                if (item === 'flag') {
                    context.updata[item] = true;
                    continue
                }
                context.updata[item] = ""
            }
            window.location.reload();
        },
        FlagType(context, val, index) {
            context.customer[val.index].flag = !Boolean(val.flag)
        }
    },
    state: {
        customer: [],
        updata: {
            nickname: '',
            WatchCode: '',
            phone_number: '',
            region: '',
            flag: true,
        },
        showDiagal: false,
        BoxShow: {
            showDiagal: false,
        }
    },
    getters: {},
}