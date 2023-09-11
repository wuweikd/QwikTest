/* SDK初始化参数 */
export type TSDKParams = {
  hiidoUrl: string, // hiido 的 url
  performanceKey: string,// 每个项目的key,用于分类报表。如收银台efoxPayCsr
  cb?: (_: any) => void // 回调，会返回一些信息给接入端，目前只是一些打印信息
  logLevel?: -1|1|2|3, // -1：不显示日志，1：error级别，2：warning级别，3: info级别；默认为3
  ver?: string, // 自定义版本号	x.x.x，建议传业务前端的版本号
  os?: string, // string
  uid?: number, // uid
  act?: string, // hiido的act，默认为'kxdwebperformance'
  appversionstring?: string,
  osversionint?: number,
  osversionstring?: string,
  appversionint?: number,
  appname?: string,
  bak1?: string,
  bak2?: string,
  bak3?: string,
  extra?: string,
}


/* 业务关键内容上报触发的方法名称  */
export enum KeyDataMethodName {
  canWorkTime= "canWorkTime", // 页面可以真正工作的时间；如收银台档位列表加载完成，用户可选择时候触发。
  keyPageTime="keyPageTime" // 页面关键内容展示的时机；如收银台档位列表加载完成，用户可选择时候触发。
}
