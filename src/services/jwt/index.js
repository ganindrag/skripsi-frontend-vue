import apiClient from '@/services/axios'
import api from '@/services/axios/axios'
import store from 'store'

export async function login(email, password) {
  return api
    .post('/login', {
      email,
      password,
    })
    .then(response => {
      if (response) {
        const { token } = response.data
        if (token) {
          store.set('accessToken', token)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  return api
    .get('/auth')
    .then(response => {
      console.log(response)
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      return true
    })
    .catch(err => console.log(err))
}

export async function createTugas(data) {
  return api
    .post('/task', data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function dataTugas(params) {
  return api
    .get('/task', { params })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function dataProgrammer() {
  return api
    .get('/programmer')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function dataSingleTugas(id) {
  return api
    .get('/task/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function editTugas(id, data) {
  return api
    .put('/task/' + id, data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function deleteTugas(id) {
  return api
    .delete('/task/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function createProgrammer(data) {
  return api
    .post('/programmer', data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function deleteProgrammer(id) {
  return api
    .delete('/programmer/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function dataSingleProgrammer(id) {
  return api
    .get('/programmer/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function editProgrammer(id, data) {
  return api
    .put('/programmer/' + id, data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function dataReport(params) {
  return api
    .get('/report', { params })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}
