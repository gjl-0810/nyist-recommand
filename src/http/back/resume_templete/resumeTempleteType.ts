import type { Status } from "@/http/util/utilType"
import type { AdminLogin } from "../account/accountType"

interface GetFile{
    fileId:number
}
/*******************管理员操作 */
/**更新简历模板 */
interface UpdateFile extends GetFile,AdminLogin{
    pdfFileName:string,
    oldPafPath:string
}
interface ResUpdateFile extends Status{
}
/**新增简历模板 */
interface InsertFile extends GetFile,AdminLogin{
    pdfFileName:string,   
}
interface ResInsertFile extends Status{
}
/**删除简历模板 */
interface DeleteFile extends GetFile,AdminLogin{
    oldPafPath:string
}
interface ResDeleteFile extends Status{
}
/**获取简历模板列表 */
interface GetResumeTempleteList extends AdminLogin{
    limit:number,
    offset:number,
}
interface ResumeTemplete{
    filePath:string,
    fileId:number
}
interface ResGetResumeTempleteList extends Status{
    total:number,
    resumeTemplete:ResumeTemplete[]
}


export type{
    GetFile,
    UpdateFile,
    InsertFile,
    DeleteFile,
    ResUpdateFile,
    ResInsertFile,
    ResDeleteFile,
    GetResumeTempleteList,
    ResumeTemplete,
    ResGetResumeTempleteList
}