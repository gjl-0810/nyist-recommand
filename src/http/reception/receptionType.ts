import type { axiosResponse } from "../util/utilType";

// 登录
interface LoginType {
    username: string;
    password: string;
}
interface LoginRes extends axiosResponse {
    readonly token?: string;
    readonly message: string;
    readonly nick_name?: string;
}
interface RegisteType extends LoginType{
    email:string;
    isRecommond: number;
    nickName:string;
    userContactInfo:string;
}
//模糊查询公司
interface FuzzyType {
  pageSize: number; 
  pageNumber: number; 
  companyName?: string; 
}


interface recommondInfo {
    readonly  key:string,
    readonly  isList:number,
    readonly  count:number,
    readonly  companyName:string,
    readonly  position:string,
    readonly  contactInfo:string,
    readonly  recommandInfo:string,
    readonly  internalPromotionPost:string,
    readonly  companyProfile:string
}
interface RecommondCompanyInfo extends axiosResponse{
  readonly recommondInfo: recommondInfo[]
  readonly total:number
};

//  修改账号

interface UpdateType extends LoginType{
    contactInfo:string,   
}
/**
 * 文件获取
 */
interface padFileResponse {
    readonly token?:string,
    readonly code: number,
    readonly message:string
    readonly base64Date?:string
}
export type {
    LoginType,
    FuzzyType,
    UpdateType,
    RegisteType,
    LoginRes,
    padFileResponse,
    RecommondCompanyInfo,
    recommondInfo
}