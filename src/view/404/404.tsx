/**
 * @author 陆海鹍
 * @date 2020-07-15 15:38:33
 * @description 描述 404路由
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import React, { Component } from 'react'

import { Button } from 'antd'

import history from '../../route/history'
import style from './style.less'

class NotFoundedPage extends Component {
  handleGoBack = ():void => {
    history.goBack()
  }

  handleGoHome = ():void => {
    history.push('/')
  }

  render (): React.ReactNode {
    return (
      <div className={style['nopage-wrapper']}>
        <div className={style['nopage-content']}>
          <i className={style['nopage-img']} />
          <p className={style['nopage-text']}>抱歉，你访问的页面没有找到。</p>
          <div className={style['nopage-back']}>
            <div className={style['nopage-back-btn']}>
              <Button type='primary' onClick={this.handleGoBack}>返回上一页</Button>
            </div>
            <div className={style['nopage-back-btn']}>
              <Button type='primary' onClick={this.handleGoHome}>首页</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundedPage
