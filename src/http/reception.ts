import type { AxiosResponse } from "axios";

import { request } from ".";
//模糊查询公司
export function fuzzy(data: { pagesize: string; pagenumber: string; title: any; },res: (arg0: AxiosResponse<any, any
>) => void){
    request({
        url:'user/article/fuzzy?'+'pagesize='+data.pagesize+'&pagenumber='+data.pagenumber,
        method:'post',
        data:{
            title:data.title
        }
    },res)
}
// 获取下载pdf接口
export function downloadPdf (data:{src:string}, res: (arg0: AxiosResponse<any, any
    >) => void) {
    request(
        {
          url: data.src,
          method: "GET",
          responseType: "arraybuffer",
        },
        res
      );
}
// 登录接口
interface loginRes {
    data:{
        code:number,

    }
}
// 登录
export function login(data: { username: string; password: string; },res: (res:loginRes) => void){
        request({
            url:'/login',
            method:'post',
            data:{
                username:data.username,
                password:data.password
            }
        },res)
    }
//  注册
export function registe(data: { username: string; password: string; contactInfo:string },res: (res:loginRes) => void){
    request({
        url:'/register',
        method:'post',
        data:{
            username:data.username,
            password:data.password,
        }
    },res)
}
// 修改账号信息
export function updateUserInfo(data: { username: string; password: string; contactInfo:string },res: (res:loginRes) => void){
    request({
        url:'/register',
        method:'post',
        data:{
            username:data.username,
            password:data.password,
        }
    },res)
}