/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 路由定义
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
import EmptyRoute from './EmptyRoute'
const routes: IRoute [] = [
  {
    path: '/student',
    meta: {
      name: '学生管理',
      icon: 'team'
    },
    component: EmptyRoute,
    routes: [
      {
        path: '/student/list',
        meta: {
          name: '学生列表'
        },
        component: EmptyRoute
      }
    ]
  },
  {
    path: '/origin',
    meta: {
      name: '原始素材',
      icon: 'pie-chart'
    },
    component: EmptyRoute,
    routes: [
      {
        path: '/origin/nav',
        meta: {
          name: '右侧导航'
        },
        component: EmptyRoute
      },
      {
        path: '/origin/move',
        meta: {
          name: '360移动'
        },
        component: EmptyRoute
      },
      {
        path: '/origin/navbar',
        meta: {
          name: '炫酷导航'
        },
        component: EmptyRoute
      }
    ]
  }
]
export default routes
