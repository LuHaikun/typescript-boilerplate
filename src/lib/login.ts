import { message } from 'antd'

import storage from './storage'
import userAPI from '../api/user'
import history from '../route/history'
import { STORAGE_USER_KEY } from '../constant'

export default (loginData: any, routePath?: string) => {
  // 发起登录请求
  return userAPI.login(loginData)
    .then((res: any) => {
      // 登录成功
      const body = res.data
      // 设置基本信息
      storage.set(STORAGE_USER_KEY, body)
      // 挂载主路由，根据具体业务而定
      history.push(routePath || '/')
    })
    .catch((err: Error) => {
      // 登录失败
      const msg = err && err.message
      message.error(msg || '请求失败')
    })
}
