//导入一个包
import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import { defaultErrorHandler } from './app.middleware';
/**
 * 创建应用
 */
const app = express();

/**
 * 配置一下处理json格式
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter, userRouter, authRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;
