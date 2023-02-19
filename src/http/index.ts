import axios, { type AxiosRequestConfig, type AxiosResponse }  from "axios";
import { ElMessage } from 'element-plus'
export function request(config: AxiosRequestConfig<any>,success: (arg0: AxiosResponse<any, any>) => void)
{
    const instance=axios.create({        
        baseURL: "http://www.nyqyfw.com:81",    
        timeout:500000,  
        headers: {                              // 请求头配置
            "Content-Type": "application/json;"
        }      
    })
    instance(config).then(
        res=>{
            success(res)
        })
        .catch(err=>{                       
            ElMessage.error('请求超时')
        })        
}
// 选择文件时 使用url
export const Url='http://www.nyqyfw.com:81/file?articleid=';