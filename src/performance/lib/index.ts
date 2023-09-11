import {TSDKParams, KeyDataMethodName} from "./types"
import  {$store} from "./store";
import {getBaseInfo} from "./getBaseInfo"
import {getPerformanceInfo, dealTriggerKeyDataReport, addPerformance} from "./getPerformanceInfo";
import {doRequest} from "./report";

import {judgeSDKParams} from "./utils/judgeParams";
/* intVer：转换版本号 */
import {intVer} from "./utils/ver";
import log from "./utils/log";

// 监听页面卸载事件
const listenUnload = () => {
  let temp = 0
  function doListen() {
    temp++
    // 最终页面离开之后再上报；利用temp防止页面重复上报
    if (temp !== 2) return
    dpReport()
  }
  document.addEventListener("visibilitychange", doListen);
  window.addEventListener("pagehide", doListen);
}

function dpReport (){
  // 执行所有存储的方法
  $store.$action.runUnloadFunList()
  const moreinfo = JSON.stringify({...$store.$getters.getPerformanceInfo(), performanceKey: $store.$getters.getSDKParams().performanceKey})
  const reportData = {...$store.$getters.getBaseInfo(), moreinfo}
  // 回调业务处理基础数据
  // @ts-ignore
  $store.$getters.getSDKParams().cb({
    message: "上报的数据",
    data: reportData
  })
  // 上报
  doRequest(reportData)
}

/* 初始化 */
function start(params: TSDKParams) {
  // 初始化参数
  $store.$action.setSDKParams(params)
  // 做监听
  listenUnload()
  // 做参数判断
  judgeSDKParams()
  // 获取上报的基础数据
  getBaseInfo()
  // 获取上报的性能数据
  getPerformanceInfo()
}

/* 触发上报关键数据 */
function triggerKeyDataReport(methodName: KeyDataMethodName) {
  dealTriggerKeyDataReport(methodName)
}

export {intVer, start, triggerKeyDataReport, addPerformance, dpReport, KeyDataMethodName}
