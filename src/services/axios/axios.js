import axios from 'axios'
import store from 'store'
import { notification } from 'ant-design-vue'

const apiClient = axios.create({
  baseURL: 'https://grandian.site/apiskripsigo',
  // baseURL: 'http://localhost:3000',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  if (!response) {
    notification.warning({
      message: error.message,
    })
  }
  const { data } = response
  if (data) {
    notification.warning({
      message: data.message,
    })
  }
})

export default apiClient
