//创建一个应用包导入名字叫做express
import express from "express";
import { Request, Response } from "express";
const app = express();

// 服务端口创建
const port = 3000;
/*使用josn中间件处理客户端发过来的json格式请求*/
app.use(express.json());

app.listen(port, () => {
  console.log("🚀服务已启动！");
});

//定义一个接口路由
app.get("/", (request: Request, response: Response) => {
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

app.get("/posts", (request: Request, response: Response) => {
  response.send(data);
});

app.get("/posts/:postId", (request: Request, response: Response) => {
  //获取ID内容（也就是浏览器地址输入的内容）赋值给postid
  const { postId } = request.params;

  //查找data元素中id的具体内容是否等于输入的内容postid，filter会以数组的形式返回
  const posts = data.filter((item) => {
    //因为这里item的值为number类型，postId的值为string文字类型所以才会进行报错，需要进行一下转换为十进制类型的数字
    return item.id == parseInt(postId, 10);
  });

  //做出响应，返回第一个数组内容
  response.send(posts[0]);
});

//创建内容
app.post("/posts", (request: Request, response: Response) => {
  //获取请求里的数据
  const { content } = request.body;
  //设置响应状态码
  response.status(201);
  //输出请求数据头部信息
  console.log(request.headers["sing-along"]);
  //设置响应的头部数据
  response.set("Sing-Along", "How I wonder what you are");
  //作出响应
  response.send({
    message: `成功创建了内容: ${content}`,
  });
});
