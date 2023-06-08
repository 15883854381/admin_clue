import Vue from 'vue'
import Vuex from 'vuex';
import login from './login';
import clue from './Clue';
import custromer from './custromer';
import order from './order';
import personnel from './personnel';
import role from './Role';
import Ulit from './Ulit';
import myClue from './my_clue';

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        login,
        clue,
        custromer,
        order,
        personnel,
        role,
        Ulit,
        myClue
    }
})


export default store