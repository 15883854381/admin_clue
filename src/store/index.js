import Vue from 'vue'
import Vuex from 'vuex';
import login from './login';
import clue from './Clue';
import custromer from './custromer';
import order from './order';
import personnel from './personnel';
import role from './Role';

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        login,
        clue,
        custromer,
        order,
        personnel,
        role
    }
})


export default store