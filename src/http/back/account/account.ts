import { request } from "@/http"
import type { AdminDeleteUser, AdminGetUserList, AdminLogin, AdminUpdateEmail, AdminUpdatePwd, AdminUpdateUserNickName, AdminUpdateUserPwd, ResAdminDeleteUser, ResAdminGetUserList, ResAdminLogin, ResAdminUpdateEmail, ResAdminUpdatePwd, ResAdminUpdateUserNickName, ResAdminUpdateUserPwd } from "./accountType"
import type { AxiosResponse } from "axios"

//  管理员登录
function adminLogin(data: AdminLogin,res: (res: AxiosResponse<ResAdminLogin, any>) => void){
    request({
        url:'/user/adminAccountLogin',
        method:'post',
        data
    },res)
}
//  管理员修改密码
function adminUpdatePwd(data: AdminUpdatePwd,
res: (res:AxiosResponse<ResAdminUpdatePwd, any>) => void){
request({
    url:'/user/adminUpdatePwd',
    method:'put',
    data
},res)
}

//普通用户 修改密码
function adminUpdateUserPwd(data:AdminUpdateUserPwd,res: (res:AxiosResponse<ResAdminUpdateUserPwd, any>) => void){
request({
    url:'/user/adminUpdateUserPwd',
    method:'put',
    data
},res)
}
//普通用户 修改昵称
function adminUpdateUserNickName(data:AdminUpdateUserNickName,res: (res:AxiosResponse<ResAdminUpdateUserNickName, any>) => void){
    request({
        url:'/user/adminUpdateUserNickName',
        method:'put',
        data
    },res)
    }
//普通用户 修改邮箱
function adminUpdateUserEmail(data:AdminUpdateEmail,res: (res:AxiosResponse<ResAdminUpdateEmail, any>) => void){
    request({
        url:'/user/adminUpdateUserEmail',
        method:'put',
        data
    },res)
}
//删除普通用户
function adminDeleteUser(data:AdminDeleteUser,res: (res:AxiosResponse<ResAdminDeleteUser, any>) => void){
    request({
        url:'/user/adminDeleteUser',
        method:'delete',
        data
    },res)
}

//获取用户列表
function getUserList(data:AdminGetUserList,res: (res:AxiosResponse<ResAdminGetUserList, any>) => void){
    request({
        url:'/user/getUserList',
        method:'get',
        params:data
    },res)
}

export{
    adminLogin,
    adminUpdatePwd,
    adminUpdateUserPwd,
    adminUpdateUserNickName,
    adminUpdateUserEmail,
    adminDeleteUser,
    getUserList
}