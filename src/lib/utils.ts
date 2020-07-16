
/**
 * @author 陆海鹍
 * @date 2020-07-15 15:26:18
 * @description 描述 工具类
 * @email luhaikun@cecdat.com
 * @copyright Copyright 2018 CEC(Fujian) Healthcare Big Data Operation Service Co., Ltd. All rights reserved.
 */
export const emptyStr = ''

export const removeEvent = function (el: Window | HTMLElement, event: string, handler: () => void): void {
  el.removeEventListener(event, handler)
}

export const addEvent = function (el: Window | HTMLElement, event: string, handler: () => void): void {
  removeEvent(el, event, handler)
  el.addEventListener(event, handler)
}

/**
 *
 * @param {number} 传入数值
 * @returns {string}
 * 将数字转换成千分位，
 * 8462948.24 转成 8,462,948.24
 * 8462948 转成 8,462,948
 */
export const thousandConvert = function (number: number): string {
  if (!Number.isInteger(number)) return ''
  const afterConvert = (number.toString().indexOf('.') !== -1)
    ? number.toLocaleString()
    : number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return afterConvert
}

/**
 *
 * @param {any} 任意值
 * @returns {boolean}
 * 判断是否为空
 */

export const isEmpty = (obj: any): boolean => {
  let isEmpty = false
  if (obj === undefined || obj === null || obj === '') {
    isEmpty = true
  } else if (Array.isArray(obj) && obj.length === 0) {
    isEmpty = true
  } else if (obj.constructor === Object && Object.keys(obj).length === 0) {
    isEmpty = true
  }
  return isEmpty
}

/**
 * 处理树结构递归
 * @param tree 树
 * @param handler 回调
 * @param childrenKey 子节点属性名称
 */
export const treeEach = (tree: object[], handler: (node: object) => void, childrenKey = 'children'): void => {
  let deep = 1
  const each = (node: any, cb: (node: object, deep: number) => void) => {
    if (node) {
      cb(node, deep)

      const children = node[childrenKey]
      deep++
      Array.isArray(children) && children.forEach(t => {
        each(t, cb)
      })
      deep--
    }
  }

  if (Array.isArray(tree)) {
    tree.forEach((t) => {
      each(t, handler)
    })
  } else {
    each(tree, handler)
  }
}

/**
 * 获取回调值
 */
export const getUnique = (() => {
  let guid = 1
  return function (prefix = 'guid') {
    return `${prefix}-${guid++}`
  }
})()

/**
 * 获取两个范围内的随机数
 * @param min 最小值
 * @param max 最大值
 */
export const getRandomNum = function (min: number, max: number): number{
	const range = max - min;
	const rand = Math.random();   
	return min + Math.round(rand * range);
}

/**
 * @param tree
 * @param targetId
 * @param childrenKey
 * @returns {array}
 * 获取当前节点的父节点链
 */
export const getParentNodeChain = (tree: object [], targetId: string | number, childrenKey = 'children'): object [] => {
  let going = true
  const parent: object[] = []
  const find = (tree: object [], targetId: string | number) => {
    tree.forEach((item: any) => {
      if (!going) return
      parent.push(item)
      if (item.id === targetId) {
        going = false
      } else if (item[childrenKey]) {
        find(item[childrenKey], targetId)
      } else {
        parent.pop()
      }
    })
    if (going) parent.pop()
  }

  find(tree, targetId)
  return parent
}

/**
 * 深克隆
 * @param source 源对象
 */
export const deepClone = (source: any) => {
  if (source === null) return null
  if (typeof source !== 'object') return source
  if (source instanceof RegExp) return new RegExp(source)
  if (source instanceof Date) return new Date(source)
  const target = new source.constructor()
  Reflect.ownKeys(source).forEach(key => {
    target[key] = deepClone(source[key])
  })
  return target
}

export default {
  emptyStr,
  addEvent,
  removeEvent
}
