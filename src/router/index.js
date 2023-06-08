import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'
import store from "@/store";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import {permissions_validation_data, upRouter} from '@/api/routerMap'
import {Message} from "element-ui";

Vue.use(Router)

const constantRoutes = [
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
    {
        path: '/user',
        redirect: '/user',
        component: Layout,
        meta: {title: '人员管理', icon: 'iconfont el-icon-biaoge'},
        children: [
            {
                path: 'customer',
                name: 'customer',
                component: () => import('@/views/customer'),
                meta: {title: '客服名单', icon: 'el-icon-user-solid'},
            }, {
                path: 'personnel',
                name: 'personnel',
                component: () => import('@/views/personnel'),
                meta: {title: '人员管理', icon: 'el-icon-user-solid'},
            }, {
                path: 'myCustomer',
                name: 'myCustomer',
                component: () => import('@/views/my_customer'),
                meta: {title: '我的人员', icon: 'el-icon-user-solid'},
            },
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
                path: 'success',
                name: 'success',
                component: () => import('@/views/Success'),
                meta: {title: '案例管理', icon: 'el-icon-user-solid'},
            }, {
                path: 'order',
                name: 'order',
                component: () => import('@/views/Order'),
                meta: {title: '订单管理', icon: 'el-icon-user-solid'},
            },
        ]
    },
    {
        path: '/outbound',
        redirect: '/outbound',
        component: Layout,
        meta: {title: '外呼线索', icon: 'iconfont el-icon-biaoge'},
        children: [
            {
                path: 'outbound',
                name: 'outbound',
                component: () => import('@/views/outbound'),
                meta: {title: '线索列表', icon: 'el-icon-user-solid'},
            }
        ]
    },
    {
        path: '/MyClue',
        component: Layout,
        meta: {title: '我的线索', icon: 'el-icon-user-solid'},
        children: [
            {
                path: 'myClue',
                name: 'myClue',
                component: () => import('@/views/my_clue'),
                meta: {title: '线索列表', icon: 'el-icon-user-solid'},
            }
        ]
    },
    {
        path: '/MyOrder',
        component: Layout,
        meta: {title: '管理订单', icon: 'el-icon-user-solid'},
        children: [
            {
                path: 'myOrder',
                name: 'myOrder',
                component: () => import('@/views/my_order'),
                meta: {title: '我的订单', icon: 'el-icon-user-solid'},
            }
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
router.beforeEach(async (to, from, next) => {
    console.log("to", to)
    if (to.path !== '/login') {
        if (!localStorage.getItem('token')) {
            await router.replace('/login')
            return false;
        }
        if (to.path !== '/index') {
            let res = await permissions_validation_data({url: to.path});
            if (res.data.code !== 200) {
                // Message.error(res.data.mes)
                return false;
            }
        }
    }

    NProgress.start()
    next()

})
// 后置卫士
router.afterEach(() => {
    NProgress.done()
})


// 获取动态数据
function addRouters() {
    let datas = upRouter().then(res => {
        let {data, code} = res.data
        if (code === 200) {
            store.dispatch('login/routerMap', data)
            routerData(data)
        }
    });
}

function loadView(view) {
    // 路由懒加载
    return () => import(`@/views/${view}`);
}

function routerData(data) {
    data.forEach(item => {
        item['component'] = Layout
        item['children'].forEach(itemChildren => {
            itemChildren['component'] = loadView(itemChildren['component'])
        })
        allRouter.push(item)
        router.addRoute(item)
    })
}

// 解决动态路由命名重复的问题
router.$addRoutes = params => {
    router.matcher = new Router({
        routes: router.options.routes
        // 关键代码
    }).matcher;
    router.addRoute(params);
};

export default router
