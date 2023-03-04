const LOGIN = '已登录';
const UNLOGIN = '未登录';
const LOGIN_SUCCESS = '登录成功';
const LOGIN_FAIL = '登录失败,请检查用户名密码是否正确';

const LOGIN_STATUS_MAP ={
    100:LOGIN,
    101:UNLOGIN,
    102:LOGIN_SUCCESS,
    103:LOGIN_FAIL,
}
export {LOGIN_STATUS_MAP}