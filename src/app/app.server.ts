import http from 'http';
import { Server } from 'socket.io';
import app from './index';
import { ALLOW_ORIGIN } from './app.config';

/**
 * HTTP 服务器
 */
const httpServer = http.createServer(app);

/**
 * IO实时服务器
 */
const socketIoServer = new Server(httpServer, {
  cors: {
    origin: ALLOW_ORIGIN,
    allowedHeaders: ['X-Total-Count'],
  },
});

socketIoServer.on('connect', socket => {
  socket.on('greet', data => {
    console.log(data);
  });
});

/**
 * 默认导出
 */
export default httpServer;
