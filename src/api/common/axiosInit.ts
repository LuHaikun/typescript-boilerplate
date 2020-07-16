import axios, { CancelToken } from 'axios'
import { message } from 'antd'
import cancelToken from './cancelToken'
import history from '../../route/history'
import utils from '../../lib/utils'

let cancel: (str: string) => void // 请求取消
let cancelTokenInstance: CancelToken // cancelToken 实例

// 路由跳转时取消请求
utils.addEvent(window, 'hashchange', () => {
  if (cancel) {
    cancel('请求取消')
    cancelTokenInstance = null
  }
})

// 获取环境变量里面的基础 API 路径，设置默认的URL
axios.defaults.baseURL = process.env.REACT_ENV_API_URL

// 请求拦截器
axios.interceptors.request.use(config => {
  if (!cancelTokenInstance) {
    cancelTokenInstance = cancelToken((c: () => void) => {
      cancel = c
    })
  }
  config.cancelToken = cancelTokenInstance
  config.timeout = 30000 // 超时时间30s
  // const tokenValue = token.get()
  // requestCount++
  // 增加 token 头
  // if (tokenValue) config.headers.common['token'] = tokenValue
  return config
}, (err) => {
  // requestCount--
  return Promise.reject(err.response)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // requestCount--
  const serverData = response.data
  if (serverData.code !== 0) {
    message.error(serverData.message || '服务端异常')
  }
  return response
}, (err: any) => {
  // requestCount--
  const serverData = (err.response && err.response.data) || {}
  // 服务端code===2000,表示token过期，跳到重新登录页面
  if (serverData.code === 2000) {
    return history.push('/login')
  }
  if (axios.isCancel(err)) {
    console.warn(err.message)
  } else {
    message.error(serverData.message || err.message || '服务端异常')
    return Promise.reject(err.response)
  }
})
