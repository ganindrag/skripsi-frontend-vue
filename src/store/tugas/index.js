import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import * as jwt from '@/services/jwt'

Vue.use(Vuex)

const typestatus = {
  tugas_todo: 'TODO',
  tugas_doing: 'DOING',
  tugas_done: 'DONE',
}

export default {
  namespaced: true,
  state: {
    dataProgrammer: null,
    dataEdit: null,
    tugas_todo: [],
    tugas_doing: [],
    tugas_done: [],
    loading: false,
    report: {
      data: [],
    },
    eval: [],
    dataFeedback: null,
  },
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    APPLY_DRAG(state, payload) {
      const { removedIndex, addedIndex, payload: data } = payload.dragResult
      const arr = state[payload.status]
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = data

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd) // add
      }

      Object.assign(state, {
        [payload.status]: result,
      })
    },
    SET_STATE_DATA_EDIT(state, payload) {
      Object.assign(state, {
        dataEdit: {
          ...state.dataEdit,
          ...payload,
        },
      })
    },
  },
  actions: {
    CREATE_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.createTugas(payload.data).then(success => {
        if (success) {
          if (payload.feedback) {
            jwt.createFeedback({ feedback: payload.feedback, task_id: success.data.id })
          }
          commit('SET_STATE', {
            loading: false,
          })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'Berhasil simpan',
          })
          router.push('/tugas')
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    LOAD_DATA_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataProgrammer()
      jwt.dataTugas().then(success => {
        if (success) {
          const tugas = []
          for (var i = success.length - 1; i >= 0; i--) {
            if (tugas[success[i].status] === undefined) tugas[success[i].status] = []
            tugas[success[i].status].push(success[i])
          }
          commit('SET_STATE', {
            tugas_todo: tugas.TODO || [],
            tugas_doing: tugas.DOING || [],
            tugas_done: tugas.DONE || [],
            loading: false,
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
      console.log(payload)
      const { addedIndex, payload: data } = payload.dragResult
      if (addedIndex !== null) {
        jwt.editTugas(data.id, { status: typestatus[payload.status] })
      }
      commit('APPLY_DRAG', payload)
    },
    LOAD_DATA_PROGRAMMER({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataProgrammer().then((data) => {
        commit('SET_STATE', {
          dataProgrammer: data,
          loading: false,
        })
      })
    },
    LOAD_DATA_EDIT_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataSingleTugas(payload.id).then((data) => {
        jwt.dataSingleReport(payload.id).then((dataReport) => {
          commit('SET_STATE', {
            loading: false,
            dataEdit: { ...data, ...dataReport },
          })
        })
      })
    },
    LOAD_DATA_FEEDBACK({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataFeedback(payload.id).then((data) => {
        commit('SET_STATE', {
          loading: false,
          dataFeedback: data,
        })
      })
    },
    EDIT_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.editTugas(payload.id, payload.data).then(success => {
        if (success) {
          commit('SET_STATE', {
            loading: false,
          })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'Berhasil simpan',
          })
          router.push('/tugas')
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    DELETE_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.deleteTugas(payload.id).then((data) => {
        router.push('/tugas')
      })
    },
    LOAD_DATA_REPORT({ commit, dispatch, rootState }, { payload }) {
      console.log(payload)
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataReport(payload).then((data) => {
        commit('SET_STATE', {
          report: data,
          loading: false,
        })
      })
    },
    RESET_DATA_REPORT({ commit }) {
      commit('SET_STATE', {
        report: {
          data: [],
        },
      })
    },
    LOAD_DATA_EVAL({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })
      jwt.dataTugas(payload).then(success => {
        if (success) {
          commit('SET_STATE', {
            eval: success,
            loading: false,
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    RESET_DATA_EVAL({ commit }) {
      commit('SET_STATE', {
        eval: [],
      })
    },
    SUBMIT_EVAL({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.editTugas(payload.id, payload.data).then(success => {
        if (success) {
          const newEval = rootState.tugas.eval.filter(data => data.id !== payload.id)
          commit('SET_STATE', {
            loading: false,
            eval: newEval,
          })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'tugas sudah dinilai.',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
    CREATE_FEEDBACK({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.createFeedback(payload.data).then(success => {
        if (success) {
          dispatch('LOAD_DATA_FEEDBACK', { payload: { id: payload.data.task_id } })
        }
      })
    },
    NILAI_TUGAS({ commit, dispatch, rootState }, { payload }) {
      commit('SET_STATE', {
        loading: true,
      })

      jwt.editTugas(payload.id, { ...payload.data, is_evaluated: true }).then(success => {
        if (success) {
          commit('SET_STATE', {
            loading: false,
          })
          dispatch('LOAD_DATA_EDIT_TUGAS', { payload: { id: payload.id } })
          Vue.prototype.$notification.success({
            message: 'Sukses!',
            description: 'Berhasil dinilai',
          })
        }
        if (!success) {
          commit('SET_STATE', {
            loading: false,
          })
        }
      })
    },
  },
  getters: {
    tugas: state => state,
  },
}
