import type { ResCompanyList } from "@/http/reception/resume/resumeType";
import type { AdminLogin } from "../account/accountType";
import type { Status } from "@/http/util/utilType";

/**获取公司列表 */
interface AdminGetCompanyList extends AdminLogin{
}
interface ResAdminGetCompanyList extends ResCompanyList{
}

/**获取职位列表 */
interface AdminGetRecommondList extends AdminLogin{
    readonly companyName:string,
}
interface ResAdminGetRecommondList extends Status{
    readonly resumePositionList:{recommondPosition:string}[]
}
/**获取职位创建者列表 */
interface AdminGetRecommondUserList extends AdminLogin{
}
interface ResAdminGetRecommondUserList extends Status{
    userList:{username:string}[]
}
/**创建、编辑职位
 * 
 */
interface AdminCreateOrEditForm {
    username:string,
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
    recruitmentStatus:string, //招聘状态
}
interface ResAdminCreateOrEditForm extends Status{
} 
/**删除、获取职位
 * 
 */
interface AdminDeleteOrGetCompany {
    username:string          //用户名
    companyName: string,     //公司名称
    recommondPosition:string,//推荐职位
}
interface ResAdminDeleteOrGetCompany extends Status{
    companyName: string, //公司名称
    position: string, //公司位置
    jobDescription: string, //职位描述
    recommondPosition:string,//推荐职位
    count: number, //招聘人数
    startDate:string
    endDate: string, //招聘截止日期
    email: string, //公司地址邮件
    isList: number, //是否上市
    salary: string, //薪资
    positionRecommonder: string, //推荐者职位
    username:string,
}
/**获取职位详细列表
 * 
 */
interface AdminGetCompanyInfoList{
    username:string,  //管理员账号
    password:string,  //管理员密码
    pagesize:number,  
    currentPage:number,
    recommondUsername:string,  //职位创建者
    recommondPosition:string,  //职位
}
interface SeekerCompanyInfo{
    username:string,         //创建者
    startDate:string,        //开始时间
    companyName: string,     //公司名称
    recruitmentStatus:string //招聘状态
    recommondPosition:string //推荐职位
}
interface ResAdminGetCompanyInfoList extends Status{
    total:number,
    companyInfo:SeekerCompanyInfo[]
}
export type{
    AdminGetCompanyList,
    ResAdminGetCompanyList,
    AdminGetRecommondList,
    ResAdminGetRecommondList,
    AdminGetRecommondUserList,
    ResAdminGetRecommondUserList,
    AdminCreateOrEditForm,
    ResAdminCreateOrEditForm,
    AdminDeleteOrGetCompany,
    ResAdminDeleteOrGetCompany,
    AdminGetCompanyInfoList,
    SeekerCompanyInfo,
    ResAdminGetCompanyInfoList
}