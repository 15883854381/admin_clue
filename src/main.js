import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'

Vue.use(ElementUI);

import animated from 'animate.css'
// Vue.use(animated)
import Content from '@/components/Content/index.vue'

Vue.component('Content',Content)


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
