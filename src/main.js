//创建一个应用包导入名字叫做express
const express = require("express");
const app = express();

// 服务端口创建
const port = 3000;
app.listen(port, () => {
  console.log("🚀服务已启动！");
});

//定义一个接口路由
app.get("/", (request, response) => {
  response.send("你好~");
});

//练习如何在数据仓库里面存取数据

//定义一个数据，然后定义一个接口区响应他
const data = [
  {
    id: 1,
    title: "关山月",
    content: "明月出天山，苍茫云海间",
  },
  {
    id: 2,
    title: "望岳",
    content: "会当凌绝顶，一览众山小",
  },
  {
    id: 3,
    title: "忆江南",
    content: "日出江花红胜火，春来江水绿如蓝",
  },
];

app.get("/posts", (request, response) => {
  response.send(data);
});

app.get("/posts/:postId", (request, response) => {
  //获取ID内容（也就是浏览器地址输入的内容）赋值给postid
  const { postId } = request.params;

  //查找data元素中id的具体内容是否等于输入的内容postid，filter会以数组的形式返回
  const posts = data.filter((item) => {
    return item.id == postId;
  });

  //做出响应，返回第一个数组内容
  response.send(posts[0]);
});
