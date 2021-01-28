/**
 * @author 陆海鹍
 * @date 2021-01-28 16:30:51
 * @description 描述 业务声明文件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */

// 路由声明
declare interface IRoute {
  path: string,
  meta: {
    name: string,
    icon?: string
  },
  exact?: boolean,
  component: React.ElementType,
  routes?: IRoute[]
}
