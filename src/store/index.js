import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { user } from '@/store/modules/user'
import { filter } from '@/store/modules/filter'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        filter,
        user
    },
    getters
})