import type { axiosResponse } from '@/http/util/utilType';

function testApi<T> ( time:number, data:T) :Promise<T>  {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, time);
       })
}
// 类型转换 arrayBuffer=> obj
/**
 * params: source:arrayBuffer
 *         type: utf-8
 * return object
 */

function arrayBufferToObj(source:ArrayBuffer,type?:string) {
    const dataView = new DataView(source);
    const decoder = new TextDecoder(type||"utf-8");

    // 读取 JSON 数据并转换成 JavaScript 对象
    const jsonString = decoder.decode(dataView);
    return JSON.parse(jsonString) as axiosResponse;
}
 export{
    testApi,
    arrayBufferToObj
 }