import type { CascaderValue } from "element-plus/es/components/cascader-panel/src/types";
import type { Status } from "../util/utilType";

// 登录
interface LoginType {
   readonly username: string;
   readonly password: string;
}
interface LoginRes extends Status {
    readonly username:string;
    readonly isRecommand:boolean;
    readonly userNickName:string;
}
interface RegisteType extends LoginType{
    readonly email:string;
    readonly isRecommond: number;
    readonly nickName:string;
    readonly checkCode: string;
    readonly newPassword: string;
}
//模糊查询公司
interface FuzzyType {
    readonly pageSize: number; 
    readonly pageNumber: number; 
    readonly companyName?: string; 
    readonly isList:number,
    readonly position:CascaderValue,
}


interface recommondInfo {
    readonly key:string,
    readonly username:string,    //推荐者账号
    readonly companyName: string, //公司名称
    readonly position: CascaderValue, //公司位置
    readonly jobDescription: string, //岗位描述
    readonly recommondPosition:string,//推荐岗位
    readonly count: number, //招聘人数
    readonly endDate: string, //招聘截止日期
    readonly email: string, //公司地址邮件
    readonly isList: number, //是否上市
    readonly salary: string, //薪资水平
    readonly positionRecommonder: string, //推荐者职位
}
interface RecommondCompanyInfo extends Status{
  readonly recommondInfo: recommondInfo[]
  readonly total:number
};

//  修改账号

interface UpdateType extends LoginType{
    readonly email?:string,
    readonly nickName?:string
    readonly newPassword?:string
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