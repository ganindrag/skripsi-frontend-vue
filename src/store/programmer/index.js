import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import * as jwt from '@/services/jwt'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    list: [],
    dataEdit: null,
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
    CREATE_PROGRAMMER({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.createProgrammer(payload.data).then(success => {
        if (success) {
          commit('SET_STATE', {
            loading: false,
          })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'Berhasil simpan',
          })
          router.push('/programmer')
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_DATA_PROGRAMMER({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataProgrammer().then(success => {
        if (success) {
          commit('SET_STATE', {
            list: success,
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
    LOAD_DATA_EDIT_PROGRAMMER({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataSingleProgrammer(payload.id).then((data) => {
        commit('SET_STATE', {
          dataEdit: data,
          loading: false,
        })
      })
    },
    EDIT_PROGRAMMER({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.editProgrammer(payload.id, payload.data).then(success => {
        if (success) {
          commit('SET_STATE', {
            loading: false,
          })
          Vue.prototype.$notification.success({
            message: 'BERASIL',
            description: 'uhuy',
          })
          router.push('/programmer')
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    DELETE_DATA({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.deleteProgrammer(payload.id).then((data) => {
        dispatch('LOAD_DATA_PROGRAMMER', { payload: false })
      })
    },
  },
  getters: {
    programmer: state => state,
  },
}
