import {$store} from "../store";
import {TSDKParams} from "../types";
let logLevel;

function getLevel() {
  const p: TSDKParams = $store.$getters.getSDKParams()
  logLevel = p.logLevel ? p.logLevel : 3
}

export default {
  info(...p) {
    getLevel()
    if ([3].indexOf(logLevel) > -1) {
      console.info( ...p)
    }
  },
  warning(...p) {
    getLevel()
    if ([2,3].indexOf(logLevel) > -1) {
      console.warn(...p)
    }
  },
  error(...p) {
    getLevel()
    if ([1,2,3].indexOf(logLevel) > -1) {
      console.error( ...p)
    }
  },
}
