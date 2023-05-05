import type { Status } from "../util/utilType";

/**创建职位
 * 
 */
export interface CreateOrEditForm {
    companyName: string, //公司名称
    position: string, //公司位置
    jobDescription: string, //职位描述
    recommondPosition:string,//推荐职位
    count: number, //招聘人数
    startDate:string
    endDate: string, //招聘截止日期
    email: string, //公司地址邮件
    isList: number, //是否上市
    salary: string, //薪资水平
    positionRecommonder: string, //推荐者职位
    username:string,
    recruitmentStatus:string, //招聘状态
}
/**删除、编辑职位
 * 
 */
export interface DeleteOrGetCompany {
    username:string          //用户名
    companyName: string,     //公司名称
    recommondPosition:string,//推荐职位
}
export interface ResCompanyInfo extends Status{
    companyName: string, //公司名称
    position: string, //公司位置
    jobDescription: string, //职位描述
    recommondPosition:string,//推荐职位
    count: number, //招聘人数
    startDate:string
    endDate: string, //招聘截止日期
    email: string, //公司地址邮件
    isList: number, //是否上市
    salary:string,    //薪资
    positionRecommonder: string, //推荐者职位
    username:string,
}
/**
 * 获取公司列表
 */
export interface GetCompanyInfoList{
    username:string,
    pagesize:number,
    currentPage:number
}
export interface ResSeekerCompanyInfo{
    startDate:string,        //开始时间
    companyName: string,     //公司名称
    recruitmentStatus:string //招聘状态
    recommondPosition:string //推荐职位
}
export interface ResCompanyInfoList extends Status{
    total:number,
    companyInfo:ResSeekerCompanyInfo[]
}

