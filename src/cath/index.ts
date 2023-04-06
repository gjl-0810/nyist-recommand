// 本地缓存

function getValue(key: string) : string {
    const value = localStorage.getItem(key);
    return value ? value : '';
}
function setValue(key: string, value: string) {
    localStorage.setItem(key, value);
}
function clearValue() {
    localStorage.clear()
}
export {
    getValue,
    setValue,
    clearValue
}