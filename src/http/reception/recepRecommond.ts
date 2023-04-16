import { request } from '..';
import type { CreateOrEditForm, CreateResume, DeleteOrGetCompany, 
  GetCompanyList, ResCompanyInfo, ResCompanyInfoList,DeleteResume, EditResumeStatus,
  GetResumeInfoList, ResResumeInfo, ResResumeInfoList,GetResumeInfo,ResCompanyList
 } from './recepRecommondType';
import type { axiosResponse } from "../util/utilType";
import type { AxiosResponse } from 'axios';

/**创建职位
 * 
 */
export const createPosition=(positionData:CreateOrEditForm,res: (res: AxiosResponse<axiosResponse, any
    >) => void)=>{
    request({
        url: 'recommond/createPosition',
        method: "post",
        data:positionData
      },
        res
    )
}
/**请求职位信息职位
 * 
 */
export const getPosition=(getEditData:DeleteOrGetCompany,res: (res: AxiosResponse<ResCompanyInfo, any
    >) => void)=>{
    request({
        url: 'recommond/getPosition',
        method: "get",
        params:getEditData
      },
        res
    )
}
/**编辑职位
 * 
 */
export const editPosition=(editData:CreateOrEditForm,res: (res: AxiosResponse<axiosResponse, any
    >) => void)=>{
    request({
        url: 'recommond/editPosition',
        method: "put",
        data:editData
      },
        res
    )
}

/**获取已创建职位列表
 * 
 */
export const getPositionList=(editData:GetCompanyList,res: (res: AxiosResponse<ResCompanyInfoList, any
    >) => void)=>{
    request({
        url: 'recommond/getPositionList',
        method: "get",
        params:editData
      },
        res
    )
}

/**删除职位
 * 
 */
export const deletePosition=(editData:DeleteOrGetCompany,res: (res: AxiosResponse<axiosResponse, any
    >) => void)=>{
    request({
        url: 'recommond/deletePosition',
        method: "delete",
        data:editData
      },
        res
    )
}

/************************************简历操作********************************************* */

/**投递简历 */
export const createResume=(createDate:CreateResume,res: (res: AxiosResponse<axiosResponse, any
  >) => void)=>{
  request({
      url: 'recommond/createResume',
      method: "post",
      headers:{
        'Content-Type':'multipart/form-data'
      },
      data:createDate
    },
      res
  )
}
/**删除简历 */
export const deleteResume=(deleteDate:DeleteResume,res: (res: AxiosResponse<axiosResponse, any
  >) => void)=>{
  request({
      url: 'recommond/deleteResume',
      method: "delete",
      data:deleteDate
    },
      res
  )
}
/**修改简历投递状态 */
export const updateResume=(updateResume:EditResumeStatus,res: (res: AxiosResponse<axiosResponse, any
  >) => void)=>{
  request({
      url: 'recommond/updateResume',
      method: "put",
      data:updateResume
    },
      res
  )
}
/**获取简历信息列表 */
export const getResumeInfoList=(getResumeInfoList:GetResumeInfoList,res: (res: AxiosResponse<ResResumeInfoList, any
  >) => void)=>{
  request({
      url: 'recommond/getResumeInfoList',
      method: "get",
      params:getResumeInfoList
    },
      res
  )
}
/**获取简历 */
export const getResumeInfo=(getResumeInfo:GetResumeInfo,res: (res: AxiosResponse<ResResumeInfo, any
  >) => void)=>{
  request({
      url: 'recommond/getResumeInfo',
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
      url: 'recommond/getCompanyInfo',
      method: "get",
      params:getCompanyInfo
    },
      res
  )
}