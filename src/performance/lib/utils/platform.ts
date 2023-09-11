import {getCookie} from "./cookies";

export const os = {
  isIOS: () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
  isAndroid: () =>/(Android)/i.test(navigator.userAgent)
}

/**
 * 获取App名字，是HAGO返回hago，否则返回空字符
 * @return {string}
 * // inline app
 export const IS_ME_APP = (IS_IOS && /yymip/.test(ua) && /\b(me)\b/.test(ua)) || (IS_ANDROID && /\b(me)\b/.test(ua))
 export const IS_SHENGLANG_APP = /soundwave/.test(ua)
 export const IS_XUNHUAN_APP = /(xunhuan,yy|xunyin)\/4\.\d+\.\d+/.test(ua) || /qingyu/.test(ua)
 export const IS_SHENGDONG_APP = /xunhuan,yy\/5\.\d+\.\d+/.test(ua) || /shengdong/.test(ua)
 export const IS_SHOUYOU_APP =
 (!IS_XUNHUAN_APP && !IS_SHENGDONG_APP && IS_ANDROID && /yy/.test(ua)) || (IS_IOS && /yym51ip/.test(ua))
 export const IS_ZHUIYIN_APP = /zhuiyin/.test(ua)
 export const IS_BILIN_APP = /inbilin/.test(ua)
 export const IS_XUNNI_APP = /girgir/.test(ua)
 export const IS_AIQIANSHOU_APP = /aiqianshou/.test(ua)
 export const IS_HONEYLOVE_APP = /honeylove/.test(ua)
 */
export const getAppName = (): string => {
  const ua = navigator.userAgent || ""
  const uaList = {
    "hago": [/yym-hagolite/, /yym-hago/],
    "shenglang": [/soundwave/],
    "xunhuan": [/xunhuan/],
    "qingyu": [/qingyu/],
    "me": [/\b(me)\b/],
    "shengdong": [/shengdong/],
    "shouyou": [/yym51ip/],
    "zhuiyin": [/zhuiyin/],
    "bilin": [/inbilin/],
    "xunni": [/girgir/],
    "aiqianshou": [/aiqianshou/],
    "honeylove": [/honeylove/],
    "yoco": [/yym-yoco/],
    "plaisa": [/plaisa/],
    "noizz":[/noizz/],
    "olaparty": [/olaparty/],
    // "chrome": [/Chrome/] 测试
  }
  for (const key in uaList) {
    // @ts-ignore
    for (const reg of uaList[key]) {
      if (reg.test(ua)) {
        return key
      }
    }
  }
  const appid = getCookie("osudb_appid")
  return appid ? "app_"+appid : ""
}

/**
 * 获取系统类型，返回android/ios/空字符
 * @return {string}
 */
export const getOsName = (): string => {
  if (os.isIOS()) {
    return "ios"
  } else if (os.isAndroid()) {
    return "android"
  }
  return ""
}
