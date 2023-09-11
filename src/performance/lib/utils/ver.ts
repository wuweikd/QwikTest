const MULTIPLE = [10000, 100, 1] // 第一位成10000，第二位成100，第三位成1

/**
 * 版本号兼容，1或者2位数据兼容
 * 6.0->6.0.0 or 6->6.0.0
 * @param s
 * @return {string}
 */
// @ts-ignore
export const coerce = (s) => {
  const ori = String(s || "").split(".")
  const fmt = []
  for (let i = 0; i < 3; i += 1) {
    fmt.push(Number(ori[i]) || 0)
  }
  return fmt.join(".")
}

/**
 * 字符版本号转换成数字类型的版本号
 * @param strVer
 * @return {number}
 */
export const intVer = (strVer = "") => {
  const verNums = String(strVer).split(".")
  let intVal = 0
  let i = 0
  const len = verNums.length
  for (; i < len; i += 1) {
    intVal += (Number(verNums[i]) * MULTIPLE[i])
  }
  return intVal
}

/**
 * 获取系统版本号，找不到则返回空0.0.0版本
 * @return {string}
 */
export const osVerStr = () => {
  const regexp = /Android\s?([\d.]+)/i // 浏览器通用的头信息
  const ver = navigator.userAgent.match(regexp)
  return coerce(ver && ver[1])
}


export const osVerInt = () => {
  return intVer(osVerStr())
}

/**
 * 获取App版本号，找不到则返回0.0.0版本。支持hago/hyoco/ludo/plaisa/noizz
 * @return {((RegExpMatchArray | null) | string) | string}
 */
export const appVerStr = () => {
  const regexp = /(yym-hago-and|yym-yoco-iOS|plaisa|yym-noizz-and|yym-olaparty-and)(\d+\.\d+\.\d+)/i
  const ver = navigator.userAgent.match(regexp)
  return coerce(ver && ver[2])
}

export const appVerInt = () => {
  return intVer(appVerStr())
}
