import Vue from 'vue'
import Vuex from 'vuex'
import ToDo from './modules/ToDo'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ToDo
    }
})