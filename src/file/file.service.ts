import path from 'path';
import Jimp from 'jimp';
import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  //准备查询
  const statement = `
  INSERT INTO file
  SET ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, file);

  //提供数据
  return data;
};

/**
 * 按ID查找文件
 */
export const findFileById = async (fileId: number) => {
  //准备查询
  const statement = `
  SELECT * FROM  file
  WHERE id =?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, fileId);

  //提供数据
  console.log('findFileById data:', data);
  return data[0];
};

/**
 * 调整图像尺寸
 */
export const imageResizer = async (image: Jimp, file: Express.Multer.File) => {
  //图像尺寸
  const { imageSize } = image['_exif'];

  //文件路径，中文方法file,destination指的是文件保存的地方也就是upload
  const filePath = path.join(file.destination, 'resized', file.filename);

  //大尺寸，quality是声明图像质量的，write是把处理的结果写入一个文件
  if (imageSize.width > 1280) {
    image
      .resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-large`);
  }

  //中等尺寸，quality是声明图像质量的，write是把处理的结果写入一个文件
  if (imageSize.width > 640) {
    image
      .resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-medium`);
  }
  //缩略图，quality是声明图像质量的，write是把处理的结果写入一个文件
  if (imageSize.width > 320) {
    image
      .resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-thumbnail`);
  }
};
