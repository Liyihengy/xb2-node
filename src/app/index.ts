//导入一个包
import express from 'express';
import cors from 'cors';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import tagRouter from '../tag/tag.router';
import commentRouter from '../comment/comment.router';
import avatarRouter from '../avatar/avatar.router';
import likeRouter from '../like/like.router';
import appRouter from '../app/app.router';
import { currentUser } from '../auth/auth.middleware';
import { defaultErrorHandler } from './app.middleware';
import { ALLOW_ORIGIN } from './app.config';
/**
 * 创建应用
 */
const app = express();

/**
 * 跨域资源共享
 */
app.use(
  cors({
    origin: ALLOW_ORIGIN,
    exposedHeaders: 'X-Total-Count',
  }),
);

/**
 * 配置一下处理json格式
 */
app.use(express.json());

/**
 *处理json
 */
app.use(currentUser);

/**
 * 路由
 */
app.use(
  postRouter,
  userRouter,
  authRouter,
  fileRouter,
  tagRouter,
  avatarRouter,
  commentRouter,
  likeRouter,
  appRouter,
);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;
