import {$store} from "./store";
import log from "./utils/log";
import {KeyDataMethodName, TPerformance} from "./types";
import {getCLS, getFCP, getFID, getLCP, getTTFB} from "web-vitals"

const fmp=0;
let fp=0;
let fcp=0;
let lcp=0;
let cls=0;
let fid=0;
let ttfb=0;
let dom =0;
let res=0;

// 动态修改属性
export function addPerformance(p: string, value: number | string) {
  const PInfo = $store.$getters.getPerformanceInfo()
  // @ts-ignore
  PInfo[p] = value
  $store.$action.setPerformanceInfo(PInfo)
}

function dealDomAndRes () {
  const timing = performance.timing
  const domInteractive = timing.domInteractive ? timing.domInteractive : Date.now()
  dom =  Math.round(domInteractive - (timing.responseEnd || Date.now()))
  res =  Math.round(timing.responseEnd - timing.responseStart)
}


// 处理页面停留时长
function dealCanWorkTime() {
  addPerformance("stayTime", Math.round(performance.now()))
  $store.$action.addUnLoadFunList(dealCanWorkTime)
}

// 处理web-vitals 相关
function dealVitals() {
  getTTFB(metric => {
    // log.info(metric)
    ttfb = Number(metric.value.toFixed(1))
    addPerformance("ttfb", ttfb)
  })
  getCLS(metric => {
    // log.info(metric)
    cls = Number(metric.value.toFixed(3))
    addPerformance("cls", cls)
  })
  getFCP(metric => {
    // log.info(metric)
    fcp = Number(metric.value.toFixed(1))
    addPerformance("fcp", fcp)

  })
  getFID(metric => {
    // log.info( metric)
    fid =  Number(metric.value.toFixed(3))
    addPerformance("fid", fid)

  })
  getLCP(metric => {
    // log.info(metric)
    lcp = Number(metric.value.toFixed(1))
    addPerformance("lcp", lcp)
  })
}

// 处理FP
function dealFP () {
  try {
    const entryHandler = (list: any) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-paint") {
          // log.info(entry)
          observer.disconnect()
          fp = Math.round(entry.startTime)
          addPerformance("fp", fp)
        }
      }
    }
    const observer = new PerformanceObserver(entryHandler)
    observer.observe({ type: "paint", buffered: true })
  } catch (e) {
    addPerformance("fp", 0)
  }
}

export function getPerformanceInfo(): void{
  dealVitals()
  dealCanWorkTime()
  dealFP()
  dealDomAndRes()
  const performanceInfo: TPerformance = {
    fmp: Math.round(performance.now()), // 获取当前sdk加载完成的时间作为fmp
    fp,
    fcp,
    lcp,
    cls,
    fid,
    ttfb,
    canWorkTime: 0, // "业务实际可交互时间": "",如收银台渲染渠道档位后
    stayTime: 0, // "页面停留时间":"",与加载时间做对标
    keyPageTime: 0, // 业务关键页面展示所需时长
    dom,
    res,
    url: location.href.substring(0, 300)
  }
  $store.$action.setPerformanceInfo(performanceInfo)
}

// 处理触发上报一些关键数据
export function dealTriggerKeyDataReport(methodName: any) {
  switch (methodName) {
  case KeyDataMethodName.canWorkTime:
    addPerformance("canWorkTime",Math.round(performance.now()))
    break
  case KeyDataMethodName.keyPageTime:
    addPerformance("keyPageTime",Math.round(performance.now()))
    break
  default:
    log.error(`【sdk】: ${methodName} is not KeyDataMethodName`)
  }
}
