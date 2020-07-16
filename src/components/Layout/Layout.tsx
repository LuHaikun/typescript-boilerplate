/**
 * @author 陆海鹍
 * @date 2020-07-15 15:25:29
 * @description 描述 页面布局
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import React, { ReactNode } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import history from '../../route/history'
import style from './style.less'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout
interface IProps {
  menus: IRoute[],
  location?: any
}
interface IState {
  selectedKeys: string [],
  openKeys: string [],
  collapsed: boolean
}
class LayoutComponent extends React.Component<IProps, IState> {
  state: IState = {
    openKeys: [],
    selectedKeys: [],
    collapsed: false
  }

  matched: IRoute = null
  rootMenuKeys = this.props.menus.map(item => item.path)
  toggle = (): void => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleSelect = (item: any): void => {
    const path: string = item.key
    history.push(path)
    this.setState(preState => ({
      ...preState,
      selectedKeys: [path]
    }))
  }
  
  handleOpenChange = (currentKeys: string[]): void => {
    const { openKeys } = this.state
    const latestKey = currentKeys.find(key => openKeys.indexOf(key) === -1)
    let newKeys: string []
    if (this.rootMenuKeys.indexOf(latestKey) === -1) {
      newKeys = openKeys
    } else {
      newKeys = latestKey ? [latestKey] : []
    }
    this.setState(preState => ({
      ...preState,
      openKeys: newKeys
    }))
  }

  getOpenKeys = (routes: IRoute [], path: string): string [] => {
    let going = true
    const parent: IRoute[] = []
    const find = (routes: IRoute [], path: string) => {
      routes.forEach((item: IRoute) => {
        if (!going) return
        parent.push(item)
        if (item.path === path) {
          going = false
        } else if (item.routes) {
          find(item.routes, path)
        } else {
          parent.pop()
        }
      })
      if (going) parent.pop()
    }
  
    find(routes, path)
    const openKeys = parent.map(_ => _.path)
    openKeys.pop()
    return openKeys
  }
  
  componentDidMount = (): void => {
    const { menus, location } = this.props
    const pathname = location.pathname
    this.matchRoute(pathname, menus)
    const openKeys = this.getOpenKeys(menus, pathname)
    if (this.matched) this.setState({ selectedKeys: [this.matched.path], openKeys})
  }

  renderMenuItem = (route: IRoute): ReactNode => {
    const { meta, routes } = route
    const hasChildren = routes.length
    return hasChildren
      ? this.renderSubMenu(route)
      : <Menu.Item key={route.path}>
        <span>{meta.name}</span>
      </Menu.Item>
  }

  renderSubMenu = (route: IRoute): ReactNode => {
    const { meta } = route
    const title = () => (
      <span>
        <UserOutlined />
        <span>{meta.name}</span>
      </span>
    )
    return (
      <SubMenu key={route.path} title={title()}>
        {
          route.routes.map(subRoutes => (
            this.renderMenuItem(subRoutes)
          ))
        }
      </SubMenu>
    )
  }

  matchRoute = (pathname: string, routes: IRoute[]): void => {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]
      if (route.path === pathname) {
        this.matched = route
        break
      } else if (!this.matched && route.routes && route.routes.length) {
        this.matchRoute(pathname, route.routes)
      }
    }
  }

  /**
   * menus配置路由集合
   * handleSelect 选中方法触发需将新条目推入历史堆栈
   */
  render (): ReactNode {
    const  { openKeys, selectedKeys } = this.state
    return (
      <div className={style['layout']}>
        <Sider
          collapsible
          trigger={null}
          className={style['layout-sider']}
          collapsed={this.state.collapsed}
        >
          <div className={style['layout-sider-logo']} />
          <Menu
            theme='dark'
            mode='inline'
            onSelect={this.handleSelect}
            onOpenChange={this.handleOpenChange}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            >
              {
                this.props.menus.map(route => (
                  this.renderMenuItem(route)
                ))
              }
          </Menu>
        </Sider>
        <div className={style['layout-compose']}>
          <Header className={style['layout-compose-header']} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: style['layout-compose-trigger'],
              onClick: this.toggle
            })}
          </Header>
          <Content
            className={style['layout-compose-content']}
          >
            {this.props.children}
          </Content>
        </div>
      </div>
    )
  }
}

export default LayoutComponent
