import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
        meta: {title: '首页', icon: 'el-icon-user-solid'},
        children: [
            {
                path: 'index',
                component: () => import('@/views/index/index'),
                meta: {title: '首页', icon: 'el-icon-user-solid'},
            }, {
                path: 'about',
                component: () => import('@/views/about/index'),
                meta: {title: '关于', icon: 'el-icon-user-solid'}
            }
        ]

    },
    // {
    //     path: '/about',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             component: () => import('@/views/about/index'),
    //             meta: { title: '关于', icon: 'el-icon-user-solid' }
    //         }
    //     ]
    // },
    {
        path: '/table1',
        redirect: '/table1',
        component: Layout,
        meta: {title: 'table', icon: 'iconfont el-icon-biaoge'},
        children: [
            {
                path: 'table',
                name: 'table',
                component: () => import('@/views/table'),
                meta: {title: '表格', icon: 'el-icon-user-solid'},
            }
        ]
    },
    {
        path: '/Clue',
        redirect: '/Clue/cluelist',
        component: Layout,
        meta: {title: '审核管理', icon: 'iconfont el-icon-biaoge'},
        children: [
            {
                path: 'cluelist',
                name: 'cluelist',
                component: () => import('@/views/Clue/index.vue'),
                meta: {title: '线索列表', icon: 'el-icon-user-solid'},
            }, {
                path: 'User',
                name: 'User',
                component: () => import('@/views/User'),
                meta: {title: '用户列表', icon: 'el-icon-user-solid'},
            }, {
                path: 'customer',
                name: 'customer',
                component: () => import('@/views/customer'),
                meta: {title: '客服名单', icon: 'el-icon-user-solid'},
            }, {
                path: 'success',
                name: 'success',
                component: () => import('@/views/Success'),
                meta: {title: '案例管理', icon: 'el-icon-user-solid'},
            },{
                path: 'order',
                name: 'order',
                component: () => import('@/views/Order'),
                meta: {title: '订单管理', icon: 'el-icon-user-solid'},
            },
        ]
    },


    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        meta: {title: '登录', icon: 'el-icon-user-solid'}
    },


    {path: '*', redirect: '/404', hidden: true}
]

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
    // scrollBehavior: (to, from) => {
    //     console.log("to", to)
    //     console.log("from", from)        
    // },
    routes: constantRoutes
})

const router = createRouter()

// 前置卫士
router.beforeEach((to, from, next) => {
    console.log("to", to)
    console.log("from", from)
    NProgress.start()
    next()
})
// 后置卫士
router.afterEach(() => {
    NProgress.done()
})


export default router
