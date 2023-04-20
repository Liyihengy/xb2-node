import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

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

/**
 * 文件处理器
 */
export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { path } = request.file;

  let image: Jimp;

  try {
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  //准备文件数据
  const { imageSize, tags } = image['_exif'];

  //在请求中添加文件数据
  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  //调整图像尺
  imageResizer(image, request.file);

  //下一步
  next();
};
