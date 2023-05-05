/************************************简历操作********************************************* */

import { request } from "@/http"
import type { AxiosProgressEvent, AxiosResponse } from "axios"
import type { DeleteResume, EditResumeStatus, GetCompanyList, GetResumeInfo, GetResumeInfoList, ResCompanyList, ResRecommondResumeInfoList, ResResumeInfo } from "./resumeType"
import type { Status } from "@/http/util/utilType"

/**投递简历 */
export const createResume=(createDate:FormData,handelProgess:(progressEvent: AxiosProgressEvent)=>void,res: (res: AxiosResponse<Status, any
    >) => void)=>{
    request({
        url: 'resume/createResume',
        method: "post",
        headers:{
          'Content-Type':'multipart/form-data'
        },
        data:createDate,
        onUploadProgress:handelProgess,
      },
        res
    )
  }
/**删除简历 */
export const deleteResume=(deleteDate:DeleteResume,res: (res: AxiosResponse<Status, any
  >) => void)=>{
  request({
      url: 'resume/deleteResume',
      method: "delete",
      data:deleteDate
    },
      res
  )
}
/**修改简历投递状态 */
export const updateResume=(updateResume:EditResumeStatus,res: (res: AxiosResponse<Status, any
  >) => void)=>{
  request({
      url: 'resume/editResume',
      method: "put",
      data:updateResume
    },
      res
  )
}
/**获取简历信息列表 内推者*/
export const getResumeInfoList=(getResumeInfoList:GetResumeInfoList,res: (res: AxiosResponse<ResRecommondResumeInfoList, any
  >) => void)=>{
  request({
      url: 'resume/getResumeInfoList',
      method: "get",
      params:getResumeInfoList
    },
      res
  )
}
/**获取简历 投递者*/
export const getResumeInfo=(getResumeInfo:GetResumeInfo,res: (res: AxiosResponse<ResResumeInfo, any
  >) => void)=>{
  request({
      url: 'resume/getResumeInfo',
      method: "get",
      params:getResumeInfo
    },
      res
  )
}
/**获取公司列表 */
export const getCompanyInfo=(getCompanyInfo:GetCompanyList,res: (res: AxiosResponse<ResCompanyList, any
  >) => void)=>{
  request({
      url: 'resume/getCompanyList',
      method: "get",
      params:getCompanyInfo
    },
      res
  )
}