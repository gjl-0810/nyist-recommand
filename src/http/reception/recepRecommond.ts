import { request } from '..';
import type { CreateOrEditForm, DeleteOrGetCompany,  ResCompanyInfo, ResCompanyInfoList, GetCompanyInfoList
 } from './recepRecommondType';
import type { Status } from "../util/utilType";
import type {  AxiosResponse } from 'axios';

/**创建职位
 * 
 */
export const createPosition=(positionData:CreateOrEditForm,res: (res: AxiosResponse<Status, any
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
export const editPosition=(editData:CreateOrEditForm,res: (res: AxiosResponse<Status, any
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
export const getPositionList=(editData:GetCompanyInfoList,res: (res: AxiosResponse<ResCompanyInfoList, any
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
export const deletePosition=(editData:DeleteOrGetCompany,res: (res: AxiosResponse<Status, any
    >) => void)=>{
    request({
        url: 'recommond/deletePosition',
        method: "delete",
        data:editData
      },
        res
    )
}

