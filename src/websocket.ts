let websock: any = null;
// 后端返回数据，正常时进行接收
let global_callback: any = null;
const serverPort = "3000"; // webSocket连接端口
const wsurl = `ws://127.0.0.1:${serverPort}/getStatistic`;
function createWebSocket(callback:any,err: ()=>void) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (websock == null || typeof websock !== WebSocket) {
    initWebSocket(callback,err);
  }
}
function initWebSocket(callback: any,err: ()=>void) {
  global_callback = callback;
  // 初始化websocket
  websock = new WebSocket(wsurl);
  websock.onmessage = function (e: any) {
    websocketonmessage(e);
  };
  websock.onclose = function (e: any) {
    websocketclose(e);
  };
  websock.onopen = function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    websocketOpen();
  };
  // 连接发生错误的回调方法
  websock.onerror = function () {
    // 错误时进行回调
    err();
    //createWebSocket();啊，发现这样写会创建多个连接，加延时也不行
  };
}
// 实际调用的方法
function sendSock(agentData: any) {
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData);
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  }
}
function closeSock() {
  websock.close();
}
// 数据接收
function websocketonmessage(msg: any) {
  let result: any = null;
  if (msg.data instanceof Blob) {
    const reader = new FileReader();
    reader.readAsText(msg.data, "UTF-8");
    reader.onload = (e: any) => {
      console.log(e);
      if (typeof reader.result === "string") {
        result = JSON.parse(reader.result);
      }
      //console.log("websocket收到", result);
      global_callback(result);
    };
  } else {
    result = JSON.parse(msg.data);
    global_callback(result);
  }
}
// 数据发送
function websocketsend(agentData: any) {
  websock.send(JSON.stringify(agentData));
}
// 关闭
function websocketclose(e: any) {
  console.log("connection closed (" + e.code + ")");
}
function websocketOpen(e: any) {
  console.log("连接打开");
}
export { sendSock, createWebSocket, closeSock };