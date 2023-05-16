import { request } from "@/http"
import type { AxiosResponse } from "axios"
import type { GetcheckCode, GetregistecheckCode, ResGetcheckCode, ResGetregistecheckCode, ResUnLoginUpdatePwd, UnLoginUpdatePwd } from "./utilType"

/**获取验证码 修改密码*/
function getCheckCode(params: GetcheckCode,res: (res: AxiosResponse<ResGetcheckCode, any>) => void){
    request({
        url:'user/getCheckCode',
        method:'get',
        params
    },res)
}
/**获取验证码 注册*/
function getRegisteCheckCode(params: GetregistecheckCode,res: (res: AxiosResponse<ResGetregistecheckCode, any>) => void){
    request({
        url:'user/getRegisteCheckCode',
        method:'get',
        params
    },res)
}
/**修改密码 无登录*/
function unLoginUpdatePwd(data: UnLoginUpdatePwd,res: (res: AxiosResponse<ResUnLoginUpdatePwd, any>) => void){
    request({
        url:'user/unLoginUpdatePwd',
        method:'put',
        data
    },res)
}

export{
    getCheckCode,
    unLoginUpdatePwd,
    getRegisteCheckCode
}