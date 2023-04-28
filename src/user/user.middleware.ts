import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
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

/**
 * 验证更新用户数据
 */
export const validateUpdateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据,validate里面储存用户的密码，update储存用户更新的数据
  const { validate, update } = request.body;

  //当前用户
  const { id: userId } = request.user;

  try {
    //检查用户是否提供了当前密码
    if (!_.has(validate, 'password')) {
      return next(new Error('PASSWORD_IS_REQUIRED'));
    }

    //调取用户数据
    const user = await userService.getUserById(userId, { password: true });

    //验证用户密码是否匹配
    const matched = await bcrypt.compare(validate.password, user.password);

    if (!matched) {
      return next(new Error('PASSWORD_DOES_NOT_MATCH'));
    }

    //检查用户名是否被占用
    if (update.name) {
      const user = await userService.getUserByName(update.name);

      if (user) {
        return next(new Error('USER_IS_EXIST'));
      }
    }

    //处理用户更新密码
    if (update.password) {
      const matched = await bcrypt.compare(update.password, user.password);

      if (matched) {
        return next(new Error('PASSWORD_IS_THE_SAME'));
      }

      //HASH用户更新密码
      request.body.update.password = await bcrypt.hash(update.password, 10);
    }
  } catch (error) {
    return next(error);
  }

  //下一步
  next();
};
