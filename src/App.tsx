/**
 * @author 陆海鹍
 * @date 2020-07-15 15:38:19
 * @description 描述 入口组件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import React from 'react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Routers from './route'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class App extends React.Component {
  render (): React.ReactNode {
    return (
      <ConfigProvider locale={zhCN}>
        <Routers />
      </ConfigProvider>
    )
  }
}

export default App
