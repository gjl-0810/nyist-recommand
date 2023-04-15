import type { CascaderValue } from "element-plus/es/components/cascader-panel/src/types";
import type { axiosResponse } from "../util/utilType";

// 登录
interface LoginType {
    username: string;
    password: string;
}
interface LoginRes extends axiosResponse {
    readonly nick_name: string;
    readonly username:string;
    readonly isRecommand:boolean;
    readonly userNickName:string;
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
  isList:number,
  position:CascaderValue,
}


interface recommondInfo {
    key:string,
    companyName: string, //公司名称
    position: CascaderValue, //公司位置
    jobDescription: string, //岗位描述
    recommondPosition:string,//推荐岗位
    count: number, //招聘人数
    endDate: string, //招聘截止日期
    email: string, //公司地址邮件
    isList: number, //是否上市
    salary: string, //薪资水平
    positionRecommonder: string, //推荐者职位
}
interface RecommondCompanyInfo extends axiosResponse{
  readonly recommondInfo: recommondInfo[]
  readonly total:number
};

//  修改账号

interface UpdateType extends LoginType{
    email?:string,
    nickName?:string
    newPassword?:string
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