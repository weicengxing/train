export interface DataRequest {
    data: any
  }
  //请求数据接口定义 用于请求数据时的返回值的定义
  export interface DataResponse {
    data: any
    code: number
    msg: string
  }
  export interface User {
    id:number
    name:string
    gty:string
  }
  export interface paging {
    page:number
    pageSize:string
  }
  export interface Hang{
    atime:string
    stime:string
    fee:number
    ban:string
    len:string
    zong:number
    yu:number
    qi:string
    zh:string
    zuo:string
  }
  export interface contentList{
    id:number
   					type: number
						headImgUrl:string
						textType: string,
						content: string,
  }
  export interface Xing{
    id:number
    apoint:string
    spoint:string
    atime:string
    stime:string
    ban:string
    biao:number

  }