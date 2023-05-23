//创建web服务器
//导入
import httpServer from './app/app.server';
//导入配置好的环境变量
import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';

//创建一个端口3000,然后在控制台输出文字
httpServer.listen(APP_PORT, () => {
  console.log('🚀 服务已启动！');
});

//测试使用数据服务连接
connection.connect(error => {
  if (error) {
    console.log('👻 连接数据服务失败', error.message);
    return;
  }
  console.log('🚗 成功连接数据服务 ~~');
});
