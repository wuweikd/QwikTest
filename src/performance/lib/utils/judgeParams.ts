/* eslint-disable no-prototype-builtins */
import {TSDKParams} from "../types";
import log from "./log";
import {$store} from "../store";
const mustParams = ["hiidoUrl", "cb", "performanceKey"]
const needParams = [
  "ver",
  "uid",
  "appversionstring",
  "osversionint",
  "osversionstring",
  "appversionint",
  "appname",]

/*
* 判断sdk的入参合法性
*  */

export function judgeSDKParams(): void {
  const errorList: Array<string> = []
  const warnList: Array<string> = []
  const p: TSDKParams = $store.$getters.getSDKParams()
  mustParams.map(v => {
    if (!p.hasOwnProperty(v)) {
      errorList.push(`[${v}]必传`)
    }
  })
  needParams.map(v => {
    if (!p.hasOwnProperty(v)) {
      warnList.push(`[${v}]非必填，但最好传入`)
    }
  })
  if (errorList[0]) {
    log.error("【sdk】错误", errorList)
  }
  if (warnList[0]) {
    log.warning("【sdk】警告", warnList)
  }
}
