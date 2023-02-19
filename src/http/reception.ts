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
