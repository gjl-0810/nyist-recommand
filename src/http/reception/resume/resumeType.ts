/*************************************简历操作***********************************/

import type { Status } from "@/http/util/utilType"

/**投递简历
 * @params
 * deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
    companyName:string,       //公司名称
    email:string,             //公司邮箱
    resume:FormData,          //简历 文件
    date:string,          //投递日期
    deliverStatus:string, //投递状态
 */
export interface CreateResume{
    deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
    companyName:string,       //公司名称
    email:string,             //公司邮箱
    resume:FormData,          //简历 文件
    date:string,          //投递日期
    deliverStatus:string, //投递状态
}
/**修改投递状态
 * @params
 * deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
    deliverStatus:string, //投递状态
    */
export interface EditResumeStatus{
    deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
    deliverStatus:string, //投递状态
}
    
/**删除简历信息
 * @params
 *  deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
    */
export interface DeleteResume{
    deliverUsername:string,   //投递者
    deliverEmail:string,      //投递者邮箱
    username:string,          //内推者账户
    recommondPosition:string, //投递职位
}
/**获取简历投递列表  投递者
 * @params
 *  deliverUsername:string,   //投递者
 *  currentPage:number,       //当前页
 *  pagesize:number           //页面大小
*/
export interface GetResumeInfo{
    deliverUsername:string,   //投递者
    currentPage:number,       //当前页
    pagesize:number           //页面大小
}
/**
 * @params
 * recommondPosition:string, //投递职位
    companyName:string,       //公司名称
    date:string,          //投递日期
    deliverStatus:string, //投递状态
    */
export interface ResResumeInfo{
    recommondPosition:string, //投递职位
    companyName:string,       //公司名称
    date:string,          //投递日期
    deliverStatus:string, //投递状态
}
/**
 * @params
 *  total:number,
     deliverResumeList:ResResumeInfo[]
    */
export interface ResDeliverResumeList extends Status{
    total:number,
    deliverResumeList:ResResumeInfo[]
}

/**获取简历投递列表 内推者
 * @params
 * username:string,    //内推者
    companyName:string, //公司名称
    pagesize:number,    //每页数量
    currentPage:number, //当前页
    */
export interface GetResumeInfoList{
    username:string,    //内推者
    companyName:string, //公司名称
    pagesize:number,    //每页数量
    currentPage:number, //当前页
}
export interface RecommondResumeInfoList{
    recommondPosition:string, //投递职位
    deliverEmail:string,      //投递者邮箱
    date:string,             //投递日期
    deliverStatus:string,    //投递状态
    username:string,
    deliverUsername:string
}
/**
 * @params
 * total:number,
     resumeInfoList:ResumeInfoList[]
*/
export interface ResRecommondResumeInfoList extends Status{
total:number,
resumeInfoList:RecommondResumeInfoList[]
}
/**获取公司列表
 * @params
    username:string
    * 
    */
export interface GetCompanyList{
    username:string
}
/**
 * @params
    companyList:string[]
    * 
    */
export interface ResCompanyList extends Status{
    companyList:{companyName:string}[]
}