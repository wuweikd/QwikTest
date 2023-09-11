import {TSDKParams, TBaseInfo, TPerformance} from "./types";
type TUnLoadFun = () => void

const $state = {
  SDKParams: {} as TSDKParams,
  baseInfo: {} as TBaseInfo,
  performanceInfo: {} as TPerformance,
  // 存储的页面卸载事件的回调方法
  unLoadFunList: [] as Array<TUnLoadFun>
}

const $getters = {
  getSDKParams() {return $state.SDKParams},
  getBaseInfo() {return $state.baseInfo},
  getPerformanceInfo() {return $state.performanceInfo},
  getUnLoadFunList() {return $state.unLoadFunList}
}

const $action = {
  setSDKParams(p: TSDKParams) {$state.SDKParams = p},
  setBaseInfo(p: TBaseInfo) {$state.baseInfo = p},
  setPerformanceInfo(p: TPerformance) {$state.performanceInfo = p},
  addUnLoadFunList(fun: TUnLoadFun) {
    $state.unLoadFunList.push(fun)
  },
  runUnloadFunList() {
    $state.unLoadFunList.map(fun => fun())
  }
}

type TStore = {
  readonly $state: typeof $state,
  readonly $getters: typeof $getters,
  $action: typeof $action,
}
const $store: TStore = {
  $state,
  $getters,
  $action,
}
export {$store}
export type {TStore}
