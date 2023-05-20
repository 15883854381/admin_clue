// 导入登录接口
import {searchobj} from '../utils/public'
import {sendCode, login} from "@/api/user";
import {Message} from 'element-ui'

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
            sendCode(userInfo).then((res) => {
                if (res.data.code !== 200) {
                    Message({
                        type: 'error',
                        message: res.data.mes,
                    });
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
        }
    },
    mutations : {},
    state: {},
    getters: {},
}