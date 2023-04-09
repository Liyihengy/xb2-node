//创建web服务器
//导入
import app from './app';
//导入配置好的环境变量
import { APP_PORT } from './app/app.config';

//创建一个端口3000,然后在控制台输出文字
app.listen(APP_PORT, () => {
  console.log('🚀 服务已启动！');
});
