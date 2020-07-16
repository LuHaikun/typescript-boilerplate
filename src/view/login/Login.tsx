/**
 * @author 陆海鹍
 * @date 2020-07-15 15:38:47
 * @description 描述 登录路由
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import React, { Component, ReactNode, MouseEvent } from 'react'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import login from '../../lib/login'
import style from './style.less'

class Login extends Component {
  formRef = React.createRef<FormInstance>()
  handleSubmit = (e: MouseEvent): void => {
    e.preventDefault()
    this.formRef.current.validateFields()
      .then(values => {
        login(values)
    })
    .catch(errorInfo => {
      console.log(errorInfo)
    })
  }

  render () : ReactNode {
    return (
      <div className={style['login']}>
        <Form ref={this.formRef} onFinish={this.handleSubmit} className={style['login-form']}>
          <Form.Item
            name={'userName'}
            label={''}
            rules={[{ required: true, message: '用户名不可为空' }]}
          >
            <Input
              allowClear
              prefix={
                <UserOutlined style={{ color: 'rgba(0,0,0,.65)' }}
              />}
              placeholder='用户名'
            />
          </Form.Item>
          <Form.Item
            name={'password'}
            label={''}
            rules={[{ required: true, message: '密码不可为空' }]}
          >
            <Input.Password
              allowClear
              prefix={
                <LockOutlined style={{ color: 'rgba(0,0,0,.65)' }}
              />}
              placeholder='密码'
            />
          </Form.Item>
          <Form.Item
            name={'captcha'}
            label={''}
            rules={[{ required: true, message: '验证码不可为空' }]}
          >
            <Input allowClear placeholder='输入验证码' />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={style['login-form-button']}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login
