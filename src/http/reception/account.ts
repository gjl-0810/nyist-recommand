import type { AxiosResponse } from "axios"
import type { LoginRes, LoginType, RegisteType, UpdateType } from "./receptionType"
import type { Status } from "../util/utilType"
import { request } from ".."

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
res: (res:AxiosResponse<Status, any>) => void){
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

// 修改密码
function updatePassword(data:UpdateType,res: (res:AxiosResponse<any, any>) => void){
request({
    url:'user/updatePassword',
    method:'put',
    data:{
        username:data.username,
        password:data.password,
        newPassword: data.newPassword
    }
},res)
}
/**
 * 修改昵称
 */
function updateNickName(data:UpdateType,res: (res:AxiosResponse<any, any>) => void){
    request({
        url:'user/updateNickName',
        method:'put',
        data:{
            username:data.username,
            password:data.password,
            nickName: data.nickName
        }
    },res)
    }
/**
 * 修改邮箱
 */
function updateEmail(data:UpdateType,res: (res:AxiosResponse<any, any>) => void){
    request({
        url:'user/updateEmail',
        method:'put',
        data:{
            username:data.username,
            password:data.password,
            email: data.email
        }
    },res)
}
/**
 * 获取账号信息
 */
function getAccountInfo(username:string,res: (res:AxiosResponse<any, any>) => void){
    request({
        url:'user/accountInfo',
        method:'get',
        params:{
            username,
        }
    },res)
}
/**
 * 获取账号投递简历相关信息
 */
function getAccountResumeInfo(username:string,res: (res:AxiosResponse<any, any>) => void){
    request({
        url:'user/accountResumeInfo',
        method:'post',
        data:{
            username,
        }
    },res)
}
export {
    login,
    registe,
    updatePassword,
    updateNickName,
    updateEmail,
    getAccountInfo,
    getAccountResumeInfo
}