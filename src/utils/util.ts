function testApi<T> ( time:number, data:T) :Promise<T>  {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, time);
       })
}
 export{
    testApi
 }