import { request } from "@/http"
import type { AxiosResponse } from "axios"
import type { AdminGetResumePositionList, ResAdminGetResumePositionList } from "./resumetype"

/**获取简历信息列表*/
export const adminGetResumePositionList=(getResumePositionList:AdminGetResumePositionList,res: (res: AxiosResponse<ResAdminGetResumePositionList, any
    >) => void)=>{
    request({
        url: 'resume/getResumePositionList',
        method: "get",
        params:getResumePositionList
      },
        res
    )
  }