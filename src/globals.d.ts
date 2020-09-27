/**
 * @author 陆海鹍
 * @date 2020-07-15 15:37:49
 * @description 描述 全局声明文件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
declare module '*.css' {
  const styles: {[key: string]: any}
  export = styles
}

declare module '*.less' {
  const styles: {[key: string]: any}
  export = styles
}

declare module '*.scss' {
  const styles: {[key: string]: any}
  export = styles
}

declare interface Window {
  [key: string]: any;
}

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
