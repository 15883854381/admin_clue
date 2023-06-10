// 导入登录接口
import {searchobj} from '../utils/public'
import {sendCode, login} from "@/api/user";
import {upRouter} from "@/api/routerMap";
import {Message} from 'element-ui'
import Layout from '@/layout/index'
import router, {constantRoutes} from "@/router";
import store from "@/store/index";

export default {
    namespaced: true,
    actions: {
        handleLogin(store, userInfo) {
            return new Promise((resolve, reject) => {
                const logininfo = searchobj(userInfo)
                if (logininfo.code != 1) {
                    reject({code: 0, message: '错了哦，这是一条错误消息'})
                }
                resolve({code: 1, message: '成功'})
            })
        },

        sendCode(store, userInfo) {
            let codeTime = setInterval(() => {
                store.state.data.CodeNUm -= 1;
                if (store.state.data.CodeNUm <= 0) {
                    store.state.data.CodeNUm = 60
                    clearInterval(codeTime)
                }
            }, 1000)

            sendCode(userInfo).then((res) => {
                if (res.data.code !== 200) {
                    Message({
                        type: 'error',
                        message: res.data.mes,
                    });
                    // 错误时计时 恢复原来数据
                    store.state.data.CodeNUm = 60
                    clearInterval(codeTime)
                } else {
                    Message({
                        type: 'success',
                        message: res.data.mes,
                    });
                }
            })
        },


        login(store, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    if (res.data.code === 200) {
                        Message({
                            type: 'success',
                            message: res.data.mes,
                        });
                        store.dispatch('routerMap')
                        localStorage.setItem('phone_number', res.data.data.phone_number)
                        localStorage.setItem('token', res.data.data.token)
                    } else {
                        Message({
                            type: 'error',
                            message: res.data.mes,
                        });
                        resolve(res.data)
                    }
                    resolve(res.data)
                })
            })
        },
        routerMap(store) {
            upRouter().then(res => {
                let {data, code} = res.data
                if (code === 200) {
                    store.commit('ROUTERMAP', data)
                }
            });
        },

    },
    mutations: {
        ROUTERMAP(state, val) {
            state.navlist = val
        }
    },
    state: {
        navlist: [],
        data: {
            codeTime: '发送验证码',
            CodeNUm: 60
        }

    },
    getters: {},
}