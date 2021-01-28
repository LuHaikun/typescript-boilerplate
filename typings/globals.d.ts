/**
 * @author 陆海鹍
 * @date 2020-07-15 15:39:02
 * @description 描述 全局声明文件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */

declare interface Window {
  [key: string]: any;
}

declare interface PlainObject {
  [propName: string]: unknown
}

declare interface BooleanObject {
  [propName: string]: boolean
}

declare interface StringObject {
  [propName: string]: string
}

declare interface NumberObject {
  [propName: string]: number
}
