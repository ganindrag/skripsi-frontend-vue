import Vue from 'vue'
import Vuex from 'vuex'
import tugas from './tugas'
import programmer from './programmer'
import user from './user'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tugas,
    programmer,
    user,
    settings,
  },
  state: {},
  mutations: {},
  actions: {},
})
