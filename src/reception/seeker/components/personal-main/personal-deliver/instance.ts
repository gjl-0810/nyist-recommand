interface TagMap {
    [index:string]:string
}
export const TAG_MAP:TagMap = {
    '已投递':'',
    '面试中':'warning',
    '已拿offer':'success',
    '面试失败':'danger'
}