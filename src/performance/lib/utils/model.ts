import { trim } from "./strings"
export const getModel = () => {
  const ua = navigator.userAgent
  // 客户端扩展的UA，标准浏览器没有  Platform/Android4.3 APP/yym-hago-and1.6.0 Model/vivo X3F Browser/Default Language/zh_CN
  const modelMatch = ua.match(/Model\/(.*?)Browser/)
  if (modelMatch) {
    return trim(modelMatch[1])
  }
  return ""
}

