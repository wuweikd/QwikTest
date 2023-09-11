import {TBaseInfo} from "./types"
import {getAppName, getOsName} from "./utils/platform";
import {getModel} from "./utils/model";
import {osVerStr, appVerStr, intVer} from "./utils/ver"
import {getCookie} from "./utils/cookies"
import {$store} from "./store";
import log from "./utils/log";

export function getBaseInfo(): void {
  const appname = getAppName()
  const appversionstring = appVerStr()
  const appversionint = intVer(appversionstring)
  const model = getModel()
  const os = getOsName()
  const osversionstring = osVerStr()
  const osversionint = intVer(osversionstring)
  const uid = Number(getCookie("osudb_uid") || getCookie("uid") || getCookie("hagouid") || getCookie("yocouid")) || 0

  const SDKParams = $store.$getters.getSDKParams()
  const baseInfo: TBaseInfo = {
    act: SDKParams.act || "kxdwebperformance",
    ver: SDKParams.ver || "0.0.0",
    appname: SDKParams.appname || appname,
    os: SDKParams.os || os,
    uid: SDKParams.uid || uid,
    osversionint: SDKParams.osversionint || osversionint,
    osversionstring: SDKParams.osversionstring || osversionstring,
    appversionint: SDKParams.appversionint || appversionint,
    appversionstring: SDKParams.appversionstring || appversionstring,
    uri: `${location.hostname}${location.pathname}`,
    bak1: SDKParams.bak1 || "",
    bak2: SDKParams.bak2 || "",
    bak3: SDKParams.bak3 || "",
    extra: SDKParams.extra || "",
    moreinfo: "",
    model, // 手机品牌
    time: 0, // 时间需要最后再处理
  }
  log.info("【sdk】", baseInfo)
  $store.$action.setBaseInfo(baseInfo)
}
