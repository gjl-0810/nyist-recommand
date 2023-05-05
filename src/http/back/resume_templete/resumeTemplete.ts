import { request } from "@/http";
import type { AxiosProgressEvent, AxiosResponse } from "axios";
import type { DeleteFile, GetResumeTempleteList, InsertFile, ResDeleteFile, ResGetResumeTempleteList, ResInsertFile, ResUpdateFile, UpdateFile } from "./resumeTempleteType";

/**获取简历模板列表 */
function getResumeList(data:GetResumeTempleteList,res: (res:AxiosResponse<ResGetResumeTempleteList, any>) => void){
    request({
        url:'/file/resumeList',
        method:'get',
        params:data
    },res)
}
/**新增简历模板 InsertFile*/
function insertPdfFile(data:FormData,handelProgess:(progressEvent: AxiosProgressEvent)=>void,res: (res:AxiosResponse<ResInsertFile, any>) => void){
    request({
        url:'/file/insert',
        method:'post',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data,
        onUploadProgress:handelProgess,
    },res)
}
/**修改简历模板  UpdateFile*/
function updatePdfFile(data:FormData,handelProgess:(progressEvent: AxiosProgressEvent)=>void,res: (res:AxiosResponse<ResUpdateFile, any>) => void){
    request({
        url:'/file/update',
        method:'put',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data,
        onUploadProgress:handelProgess,
    },res)
}
/**删除简历模板*/
function deletePdfFile(data:DeleteFile,res: (res:AxiosResponse<ResDeleteFile, any>) => void){
    request({
        url:'/file/delete',
        method:'delete',
        data
    },res)
}
export {
    getResumeList,
    insertPdfFile,
    updatePdfFile,
    deletePdfFile
}