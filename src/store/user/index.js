import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import store from 'store'

import * as jwt from '@/services/jwt'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    email: '',
    avatar: '',
    authorized: process.env.VUE_APP_AUTHENTICATED || false, // false is default value
    loading: false,
  },
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {
    LOGIN({ commit, dispatch, rootState }, { payload }) {
      const { email, password } = payload
      commit('SET_STATE', {
        loading: true,
      })

      jwt.login(email, password).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
          Vue.prototype.$notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in to Air UI Vue Admin Template!',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_CURRENT_ACCOUNT({ commit, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.currentAccount().then(response => {
        console.log(response)
        if (response) {
          const { id, name, email, role } = response
          commit('SET_STATE', {
            id,
            name,
            email,
            role,
            authorized: true,
          })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
    LOGOUT({ commit, rootState }) {
      store.remove('accessToken')
      commit('SET_STATE', {
        id: '',
        name: '',
        role: '',
        email: '',
        avatar: '',
        authorized: false,
        loading: false,
      })
      router.push('/auth/login')
    },
    LOAD_DATA_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.dataTugas().then(success => {
        if (success) {
          const tugas = []
          for (var i = success.length - 1; i >= 0; i--) {
            if (tugas[success[i].status] === undefined) tugas[success[i].status] = []
            tugas[success[i].status].push(success[i])
          }
          commit('SET_STATE', {
            tugas_todo: tugas.TODO,
            tugas_doing: tugas.DOING,
            tugas_done: tugas.DONE,
            loading: false,
          })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'Berhasil simpan',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    APPLY_DRAG({ commit, dispatch, rootState }, { payload }) {
      commit('APPLY_DRAG', payload)
    },
  },
  getters: {
    user: state => state,
  },
}
