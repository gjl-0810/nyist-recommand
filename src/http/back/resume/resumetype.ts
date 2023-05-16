import type { Status } from "@/http/util/utilType"

export interface AdminGetResumePositionList{
    username:string,    //管理员 账号
    password:string,    //管理员 密码
    companyName:string, //公司名称
    resumePosition:string, //职位名称
    pagesize:number,    //每页数量
    currentPage:number, //当前页
}
export interface RecommondResumePositionList{
    recommondPosition:string, //投递职位
    deliverEmail:string,      //投递者邮箱
    date:string,             //投递日期
    deliverStatus:string,    //投递状态
    companyName:string,
    username:string,         
    deliverUsername:string
}
/**
 * @params
 * total:number,
   resumeInfoList:ResumeInfoList[]
*/
export interface ResAdminGetResumePositionList extends Status{
    total:number,
    resumePositionList:RecommondResumePositionList[]
}