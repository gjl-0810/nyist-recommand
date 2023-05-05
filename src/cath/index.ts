// 本地缓存
export const USERNAME = 'username';
export const ADMIN_USER_NAME = 'adminUsername';
export const ADMIN_NAV_KEY = 'adminNavKey';
export const NAV_KEY = 'navKey';
export const EMAIL = 'emali';
export const TOKEN = 'token';
export const USER_NICk_NAME = 'userNickName'
export const ADMIN_USER_NICK_NAME = 'adminUserNickName';
export const IS_LIST = 'isList';
export const ADMIN_PASSWORD = 'adminPassword';
IS_LIST
function getValue(key: string) : string {
    const value = localStorage.getItem(key);
    return value ? value : '';
}
function setValue(key: string, value: string) {
    localStorage.setItem(key, value);
}
function clearValue() {
    localStorage.removeItem(TOKEN)
}
export {
    getValue,
    setValue,
    clearValue
}