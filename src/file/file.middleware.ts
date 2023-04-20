import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * 创建一个multer，上传文件储存位置
 */

const fileUpload = multer({
  dest: 'upload/',
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
