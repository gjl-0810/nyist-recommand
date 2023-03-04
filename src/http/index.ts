import axios, { type AxiosRequestConfig, type AxiosResponse }  from "axios";
import { ElMessage } from 'element-plus'

const BASE_URL = 'http://127.0.0.1:3000';

function request(config: AxiosRequestConfig<any>,success: (arg0: AxiosResponse<any, any>) => void)
{
    const instance=axios.create({        
        baseURL: BASE_URL,    
        timeout:500000,  
        withCredentials:true,
        headers: {                              // 请求头配置
            "Content-Type": "application/json;",
            'Authorization':'',
        }      
    })
    instance(config).then(
        res=>{
            success(res)
        })
        .catch(err=>{
            console.error(err);          
            ElMessage.error('请求超时')
        })
}
export {
    BASE_URL,
    request,
}