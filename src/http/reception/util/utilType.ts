import type { Status } from "@/http/util/utilType";
/**获取验证码 */
interface GetcheckCode {
    readonly username: string;
 }
interface ResGetcheckCode extends Status {
}
/**获取验证码 */
interface GetregistecheckCode {
    readonly email: string;
 }
interface ResGetregistecheckCode extends Status {
}
/**未登录 修改密码 */
interface UnLoginUpdatePwd {
    readonly username: string;
    readonly checkCode: string;
    readonly newPassword: string;
 }
interface ResUnLoginUpdatePwd extends Status {
}
export type{
    GetcheckCode,
    ResGetcheckCode,
    UnLoginUpdatePwd,
    ResUnLoginUpdatePwd,
    GetregistecheckCode,
    ResGetregistecheckCode
}