import { request } from "@/http";
import type { AxiosResponse } from "axios";
import type { AdminCreateOrEditForm, AdminDeleteOrGetCompany, AdminGetCompanyInfoList, AdminGetCompanyList, AdminGetRecommondList, AdminGetRecommondUserList, ResAdminCreateOrEditForm, ResAdminDeleteOrGetCompany, ResAdminGetCompanyInfoList, ResAdminGetCompanyList, ResAdminGetRecommondList, ResAdminGetRecommondUserList } from "./recommondType";

/**获取公司列表 */
function adminGetCompanyList(params:AdminGetCompanyList,res: (res:AxiosResponse<ResAdminGetCompanyList, any>) => void){
    request({
        url:'/recommond/adminGetCompanyList',
        method:'get',
        params
    },res)
}
/**获取职位列表 */
function adminGetRecommondPositonList(params:AdminGetRecommondList,res: (res:AxiosResponse<ResAdminGetRecommondList, any>) => void){
    request({
        url:'/recommond/adminGetRecommondPositonList',
        method:'get',
        params
    },res)
}
/**获取职位创建者列表 */
function adminGetRecommondUserList(params:AdminGetRecommondUserList,res: (res:AxiosResponse<ResAdminGetRecommondUserList, any>) => void){
    request({
        url:'/recommond/adminGetRecommondUserList',
        method:'get',
        params
    },res)
}
/**创建职位
 * 
 */
const adminCreatePosition=(positionData:AdminCreateOrEditForm,res: (res: AxiosResponse<ResAdminCreateOrEditForm, any
    >) => void)=>{
    request({
        url: 'recommond/adminCreatePosition',
        method: "post",
        data:positionData
      },
        res
    )
}
/**请求职位信息职位
 * 
 */
const adminGetPosition=(getEditData:AdminDeleteOrGetCompany,res: (res: AxiosResponse<ResAdminDeleteOrGetCompany, any
    >) => void)=>{
    request({
        url: 'recommond/adminGetPosition',
        method: "get",
        params:getEditData
      },
        res
    )
}
/**编辑职位
 * 
 */
const adminEditPosition=(editData:AdminCreateOrEditForm,res: (res: AxiosResponse<ResAdminCreateOrEditForm, any
    >) => void)=>{
    request({
        url: 'recommond/adminEditPosition',
        method: "put",
        data:editData
      },
        res
    )
}
/**删除职位
 * 
 */
const adminDeletePosition=(editData:AdminDeleteOrGetCompany,res: (res: AxiosResponse<ResAdminDeleteOrGetCompany, any
    >) => void)=>{
    request({
        url: 'recommond/adminDeletePosition',
        method: "delete",
        data:editData
      },
        res
    )
} 
/**获取已创建职位列表
 * 
 */
const adminGetPositionList=(editData:AdminGetCompanyInfoList,res: (res: AxiosResponse<ResAdminGetCompanyInfoList, any
    >) => void)=>{
    request({
        url: 'recommond/adminGetPositionList',
        method: "get",
        params:editData
      },
        res
    )
}
export {
    adminGetCompanyList,
    adminGetRecommondPositonList,
    adminGetRecommondUserList,
    adminCreatePosition,
    adminGetPosition,
    adminEditPosition,
    adminGetPositionList,
    adminDeletePosition
}


