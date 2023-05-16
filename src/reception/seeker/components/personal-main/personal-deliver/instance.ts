interface TagMap {
    [index:string]:string
}
export const TAG_MAP:TagMap = {
    '已投递':'',
    '面试中':'warning',
    'offer':'success',
    '结束':'danger'
}