import type {Status } from '@/http/util/utilType'
import type {LoginType} from '@/http/reception/receptionType'
/****************管理员 */
/**登录
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 */
interface AdminLogin extends LoginType{
}
interface ResAdminLogin extends Status{
    readonly userNickName:string
}

/**修改密码 
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 * @param newPassword:string 管理员新密码
*/
interface AdminUpdatePwd extends LoginType{
    readonly newPassword:string
}
interface ResAdminUpdatePwd extends Status{
}
/***删除普通用户 
 *  @param username:string 管理员账号
 *  @param password:string 管理员密码
 *  @param userUsername:string 用户账号
 *  @param userPassword:string 用户密码
*/
interface AdminDeleteUser extends LoginType{
    readonly userUsername:string 
    readonly userPassword:string
 }
interface ResAdminDeleteUser extends Status{
 }
/***修改普通用户密码 
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 * @param userUsername:string 用户账号
 * @param userNewPassword:string 用户新密码
*/
interface AdminUpdateUserPwd extends LoginType{
   readonly userUsername:string
   readonly userNewPassword:string
}
interface ResAdminUpdateUserPwd extends Status{
}
/***修改普通用户昵称 
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 * @param userUsername:string 用户账号
 * @param userNickName:string 用户新昵称
*/
interface AdminUpdateUserNickName extends LoginType{
    readonly userUsername:string
    readonly userNickName:string
}
interface ResAdminUpdateUserNickName extends Status{
}
/***修改普通用户邮箱 
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 * @param userUsername:string 用户账号
 * @param userEmail:string 用户新邮箱
*/
interface AdminUpdateEmail extends LoginType{
    readonly userUsername:string
    readonly userEmail:string
}
interface ResAdminUpdateEmail extends Status{
}
/***获取普通用户列表 
 * @param username:string 管理员账号
 * @param password:string 管理员密码
 * @param limit:number 每页大小
 * @param offset:number 第几页 从0开始
*/
interface AdminGetUserList extends LoginType{
    readonly limit:number,
    readonly offset:number,
}
interface UserItem{
    userUsername:string,
    userPassword:string,
    userNickName:string,
    UserEmail:string,
    userid:string,
}
interface ResAdminGetUserList extends Status{
    userList:UserItem[],
    total:number
}


export type{
    AdminLogin,
    ResAdminLogin,
    AdminUpdatePwd,
    ResAdminUpdatePwd,
    AdminUpdateUserPwd,
    ResAdminUpdateUserPwd,
    AdminUpdateUserNickName,
    ResAdminUpdateUserNickName,
    AdminGetUserList,
    UserItem,
    ResAdminGetUserList,
    AdminDeleteUser,
    ResAdminDeleteUser,
    AdminUpdateEmail,
    ResAdminUpdateEmail,

}