import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as userService from './user.service';

/**
 * 验证用户数据中间件
 */
export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮🏻 验证用户数据');
  //准备数据
  const { name, password } = request.body;
  //验证必填数据
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));
  //验证用户名
  const user = await userService.getUserByName(name);
  if (user)
    return (
      next(new Error('USER_IS_EXIST')),
      //下一步
      next()
    );
};
// export const validateUserData = (request, response, next) => {
//   const { name, password } = request.body;
//   if (!name) return next(new Error('NAME_IS_REQUIRED'));
//   if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));
//   next();
// };

/**
 * HASH密码
 */
export const hashPassword = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { password } = request.body;
  //HASH密码
  request.body.password = await bcrypt.hash(password, 6);
  //下一步
  next();
};
