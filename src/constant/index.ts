/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 产量文件
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
export const PHONE_REG = /1\d{10}$/

export const STORAGE_USER_KEY = 'user_data'

export const ERROR_STATUS = [
  { status: 0, label: '不限', color: 'red' },
  { status: 1, label: '未发现', color: '#52C41A' },
  { status: 2, label: '异常', color: '#F5222D' },
  { status: 3, label: '正常', color: '#1890FF' }
]

export default {
  PAGE_LIMIT: 20,
  API_VER_1: 'v1.0',
  ERROR_STATUS,
  STORAGE_USER_KEY
}
