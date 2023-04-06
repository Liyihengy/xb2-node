// 提供服务搭建http服务器
// 请求与响应
// const http = require("http");
// const server = http.createServer((request, response) => {
//   console.log(request.headers["user-agent"]);

//   response.writeHead(200, {
//     "content-type": "text/html",
//   });
//   response.write(`<input />`);
//   response.end();
// });

// server.listen(3000, () => {
//   console.log("🚀服务已启动！");
// });

// 根据请求的地址服务端响应相应的内容;
// const http = require("http");
// const server = http.createServer((request, response) => {
//   switch (request.url) {
//     case "/":
//       response.write("Hello~~");
//       break;
//     case "/posts":
//       response.write("posts~~");
//       break;
//     case "/signup":
//       response.write("signup~~");
//       break;
//     default:
//       response.writeHead(404);
//       response.write("404");
//       break;
//   }

//   response.end();
// });

// server.listen(3000, () => {
//   console.log("🚀服务已启动！");
// });

//响应josn格式的数据：通过转换json格式的数据是客户端能懂需要干什么
// const http = require("http");
// const server = http.createServer((request, response) => {
//   const data = {
//     id: 1,
//     title: "关山月",
//     content: "日照香炉生紫烟",
//   };
//   const josnData = JSON.stringify(data); //转换json格式
//   response.writeHead(200, {
//     "content-type": "application/json; charset=utf-8",
//   });
//   response.write(josnData);
//   response.end();
// });
// server.listen(3000, () => {
//   console.log("🚀服务已启动！");
// });
