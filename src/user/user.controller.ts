import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import * as userService from './user.service';
import { connection } from 'src/app/database/mysql';

/**
 * 创建用户
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { name, password } = request.body;

  //创建用户
  try {
    const data = await userService.createUser({ name, password });

    //相应数据
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 用户账户
 */
export const show = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { userId } = request.params;

  //调取用户
  try {
    const user = await userService.getUserById(parseInt(userId, 10));

    if (!user) {
      return next(new Error('USER_NOT_FOUND'));
    }
    //作出响应
    response.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新用户
 */
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //准备数据
  const { id } = request.user;
  const userData = _.pick(request.body.update, ['name', 'password']);

  //更新用户
  try {
    const data = await userService.updateUser(id, userData);

    //作出响应
    response.send(data);
  } catch (error) {
    next(error);
  }
};
