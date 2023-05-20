import Vue from 'vue'
import Vuex from 'vuex';
import login from './login';
import clue from './Clue';
import custromer from './custromer';
import order from './order';

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        login,
        clue,
        custromer,
        order
    }
})


export default store