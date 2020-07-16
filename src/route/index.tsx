/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 路由组件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import React, { Component, ReactNode } from 'react'
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom'

import NoMatch from '../view/404'
import Login from '../view/login'
import Layout from '../components/Layout'
import getRoutes from './getRoutes'
import history from './history'

class Router extends Component<RouteProps, {defaultRoute: string}> {
  routes: IRoute[] = null
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      defaultRoute: '',
    }
    this.routes = getRoutes()
  }
  async componentDidMount (): Promise<void> {
    const isLogin = true
    if (isLogin) {
      this.setInitRoute()
    } else {
      history.push('/login')
    }
  }
  
  renderRoute = (routes: IRoute[]): ReactNode [] => {
    return routes.map((route: IRoute): ReactNode => {
      if (route.routes.length) return this.renderRoute(route.routes)
      return (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={
            props => {
              const WrappedComponent = route.component
              return (
                <WrappedComponent {...props} />
              )
            }
          }
        />
      )
    })
  }

  setInitRoute = (): void => {
    this.setState(preState => ({
      ...preState,
      defaultRoute: this.getInitRoute(this.routes)
    }))
  }

  getInitRoute = (routes: IRoute []): string => {
    if (routes[0].routes.length) return this.getInitRoute(routes[0].routes)
    return routes[0].path
  }

  /**
   * Switch 没有匹配项直接匹配第一个
   * this.renderRoute(routesMap)直接返回 routeConfig配置的Route集合
   * location浏览器当前路径
   */
  render (): ReactNode {
    const { defaultRoute } = this.state
    const redirectTo = defaultRoute || '/login'
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <Redirect to={redirectTo} />
          </Route>
          <Route exact path='/login' component={Login} />
          <Route exact path='/404' component={NoMatch} />
          <Layout
            menus={this.routes}
          >
            {this.renderRoute(this.routes)}
          </Layout>
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
