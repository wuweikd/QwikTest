import {TSDKParams, KeyDataMethodName} from "./sdkTypes";
export type {TSDKParams}
export {KeyDataMethodName}

/* 基础数据 */
export type TBaseInfo = {
  act: string,
  uri: string,
  time: number,
  ver: string,
  appversionstring: string,
  appversionint: number,
  appname: string,
  os: string,
  model: string,
  osversionint: number,
  osversionstring: string,
  uid:	number
  bak1:	string
  bak2:	string
  bak3:	string
  extra:	string
  moreinfo:string // 格式为JSON.stringify(obj); obj:TPerformance
}
/* 性能数据 */
export type TPerformance = {
  fmp: number,
  fp: number,
  fcp: number
  lcp: number
  cls: number
  fid: number
  ttfb: number
  canWorkTime: number, // "业务实际可交互时间": "",如收银台渲染渠道档位后
  stayTime: number, // "页面停留时间":"",与加载时间做对标
  keyPageTime: number, // 业务关键页面展示所需时长
  res: number, // 入口资源解析时长
  dom: number, // HTML入口页的内容返回时间
  url: string, // 页面全路径（0-300长度）
}

/* 所有的上报数据 */
export type TReportData = TBaseInfo

/*
Hiido 报表字段：

act	string	kxdwebperformance	必备字段
time	int	客户端时间(Unix时间戳)	必备字段 秒
key	string	数据完整校验码	必备字段(算法见帮助信息)
uri	string	页面对应uri	页面对应uri
fmp	int	FMP	毫秒
extra	string	自定义数据	自定义数据
ver	string	自定义版本号	x.x.x
appversionstring	string	app字符串版本号	app字符串版本号
appversionint	int	app数字版本号	app数字版本号
osversionint	int	系统字符串版本号	系统字符串版本号
osversionstring	string	系统数字版本号	系统数字版本号
appname	string	app名称	app名称
os	string	系统平台名称	系统平台名称，强烈建议传，SDK只能根据UA区分少量业务，如：hago、noizz、olaparty
model	string	手机品牌	手机品牌
moreinfo	string	扩展字段	传入json字符串
bak1	string	备用字段1	备用字段
bak2	string	备用字段2	备用字段
bak3	string	备用字段3	备用字段
uid	bigint	用户ID	必备字段
dt *	string	partition	N/A
* */
