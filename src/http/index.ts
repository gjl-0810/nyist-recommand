import { clearValue, getValue,TOKEN } from "@/cath";
import router from "@/router";
import { arrayBufferToObj } from "@/utils/util";
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse }  from "axios";
import { ElMessage } from 'element-plus'

const BASE_URL = 'http://127.0.0.1:3000';

function request(config: AxiosRequestConfig<any>,success: (arg0: AxiosResponse<any, any>) => void)
{
    const instance=axios.create({        
        baseURL: BASE_URL,    
        timeout:500000,
        withCredentials:true,
        headers:{
            Authorization:`Bearer ${getValue(TOKEN)}`,
            'Content-Type':'application/x-www-form-urlencoded'
        }      
    });
    // 请求拦截
    
    // 响应拦截
    instance.interceptors.response.use(function fullfill(response:AxiosResponse) {
        return response;
    },function rejected(err:AxiosError<any>) {
        // 状态码>2xx
        // 如果token过期，返回到登录页面
        // 判断返回类型是否为arrayBuffer true:@default => obj
        if(err.response&&err.response.data instanceof ArrayBuffer){
            err.response.data= {message:String(arrayBufferToObj(err.response.data))};
        }
        if(err.response&&err.response.data.token===''){
            clearValue();
            router.push('/login');
        }
        if(err.code==='ERR_NETWORK'){
            err.message = '网络连接错误，请检查网络！'
        }
        return Promise.reject(err.response&&err.response.data||err);
    });
    // 处理请求失败
    instance(config).then(
        res=>{
            success(res)
        })
        .catch(err=>{
            // 进行前端网络请求错误拦截     
            ElMessage.error({grouping:true,message:err.message||'未知错误'})
        })
}
export {
    BASE_URL,
    request,
}