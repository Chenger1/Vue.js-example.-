import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks'
import user from './modules/user'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        tasks,
        user
    }
})