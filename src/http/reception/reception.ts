import type { AxiosResponse } from "axios";

import { request } from "..";
import type { axiosResponse } from "../util/utilType";
import type { FuzzyType, LoginRes, LoginType, RecommondCompanyInfo, RegisteType, UpdateType, padFileResponse } from "./receptionType";

/**
 * 查找公司
 * @param companyName 公司名称
 * @param res 公司基本信息
 */
 function fuzzy(data:FuzzyType,res: (res: AxiosResponse<RecommondCompanyInfo, any>) => void){
    request({
        url:'/recommond/recommondInfoList',
        method:'post',
        data:{
            companyName:data.companyName||'all',
            pageSize:data.pageSize,
            pageNumber:data.pageNumber
        }
    },res)
}
/**
 * 查询
 * @param data 
 * @param res 
 */
// 获取下载pdf接口
 async function downloadPdf (data:{fileId:number}, res: (res: AxiosResponse<padFileResponse, any
    >) => void) {
    request(
        {
          url: 'file/pdfFile',
          method: "get",
          params:{
            fileId:data.fileId,
          }
        },
         res
      );
}


// 登录
 function login(data: LoginType,res: (res: AxiosResponse<LoginRes, any>) => void){
        request({
            url:'user/login',
            method:'post',
            data:{
                username:data.username,
                password:data.password
            }
        },res)
    }
//  注册
 function registe({username,password,isRecommond,email,userContactInfo,nickName}: RegisteType,
    res: (res:AxiosResponse<axiosResponse, any>) => void){
    request({
        url:'user/registe',
        method:'post',
        data:{
            username,
            password,
            isRecommond,
            email,
            userContactInfo,
            nickName
        }
    },res)
}

// 修改账号信息
 function updateUserInfo(data:UpdateType,res: (res:AxiosResponse<any, any>) => void){
    request({
        url:'user/update',
        method:'post',
        data:{
            username:data.username,
            password:data.password,
            contactInfo: data.contactInfo
        }
    },res)
}



export  {
    fuzzy,
    downloadPdf,
    login,
    registe,
    updateUserInfo,
    
}