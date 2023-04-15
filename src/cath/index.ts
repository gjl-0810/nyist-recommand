// 本地缓存
export const USERNAME = 'username';
export const NAV_KEY = 'navKey';
export const TOKEN = 'token';
export const USER_NICk_NAME = 'userNickName'
export const IS_LIST = 'isList'
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