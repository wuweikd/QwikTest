import querify from "./utils/querify"
import md5 from "md5"
import {$store} from "./store";
import {TReportData} from "./types";
import log from "./utils/log";

/**
 * 上报请求
 * @param {Object} params URL参数
 */
export const doRequest = (params: TReportData) => {
  const act = params.act
  params.time = Math.floor(Date.now() / 1000)
  const key = md5(`${act}${params.time}HiidoYYSystem`)
  const url = `${$store.$getters.getSDKParams().hiidoUrl}?act=${act}&key=${key}&${querify(params)}`
  // 暂时取消上报
  // if (window.fetch) {
  //   window.fetch(url, {method: "get", keepalive: true}).catch(e => log.error("fetch", e))
  // } else{
  //   let img = new Image()
  //   img.onerror = img.onload = function () {
  //     img = null
  //   }
  //   img.src = url
  // }
}
