/**
 * @author 陆海鹍
 * @date 2021-01-28 16:31:30
 * @description 描述 资源声明文件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */

declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}
declare module '*.svg' {
  const content: SvgrComponent
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.jpeg' {
  const content: any
  export default content
}

declare module '*.gif' {
  const content: any
  export default content
}

declare module '*.css' {
  const styles: {[key: string]: any}
  export = styles
}

declare module '*.less' {
  const styles: {[key: string]: any}
  export = styles
}

// for css-module
declare module '*.scss' {
  const styles: {[key: string]: any}
  export = styles
}
