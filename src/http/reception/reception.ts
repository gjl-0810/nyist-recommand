import type { AxiosResponse } from "axios";

import { request } from "..";
import type { FuzzyType,RecommondCompanyInfo, padFileResponse } from "./receptionType";

/**
 * 查找公司
 * @param companyName 公司名称
 * @param res 公司基本信息
 */
 function fuzzy(data:FuzzyType,res: (res: AxiosResponse<RecommondCompanyInfo, any>) => void){
    request({
        url:'/recommond/recommondInfoList',
        method:'post',
        data
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





export  {
    fuzzy,
    downloadPdf,
}