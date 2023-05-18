import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { error } from 'console';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';
/**
 * 验证用户登录数据
 */
export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮🏻 验证用户登录数据');
  //准备数据
  const { name, password } = request.body;
  //验证必填数据
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));
  //验证用户名
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));
  //验证用户密码
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));

  //在请求主体里天假用户
  request.body.user = user;

  //下一步
  next();
};

/**
 * 验证用户身份
 */
export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮🏻 验证用户身份');

  try {
    //提取Authorization
    const authorization = request.header('Authorization');
    if (!authorization) throw new Error();

    //提取JWT令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    //验证令牌，验证用户在客户端输入的信息与jwt令牌与公钥作对比验证，验证成功后把客户端的数据赋值给decoded这个常量
    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

    //在请求里添加用户，获取请求里用户的数据，我在之前这个文件里定义了user里面所包含的数据
    request.user = decoded as TokenPayload;

    //下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};

/**
 * 访问控制，定义一个类型AccessControlOptions，导出一个高阶函数accessControl，他的参数为options: AccessControlOptions，里面生成一个异步函数输出'👮🏻 访问控制');，解构options的值也就是一个为布尔类型的值交给possession，从请求里面获取到之前定义的request.user交给新的变量userId，如果userId里面包含的属性的值为1，则返回下一步，定义一个常量resourceIdParam获取请求里的第一个属性值，替换resourceIdParam里面’Id‘名称为空，转化resourceIdParam里面的属性字符串为十进制数字，后面使用如果possession之前定义的是一个布尔值则运行声明一个变量ownResource，上传possess数据库里的值resourceId, resourceType, userId交给ownResource，如果不包含resourceId, resourceType, userId则返回一个错误USER_DOES_NOT_OWN_RESOURCE，最后如果不包含上述任何一个情况则返回一个错误。
 * 这段代码导出的高阶函数 accessControl 接受一个类型为 AccessControlOptions 的参数 options，并返回一个异步函数。这个异步函数的作用是进行访问控制，其中包括检查用户的权限和资源的拥有权。

在这个异步函数里，首先解构出 options 对象里的 possession 值（这个值表示是否检查资源的拥有权），然后从请求对象中获取当前用户的 ID，如果这个 ID 的属性值为 1，就直接返回下一步。

接下来，异步函数会从请求对象中获取到一个名为 resourceIdParam 的变量，它是请求 URL 中的第一个属性名。接着，将属性名中的 "Id" 字符串替换为空字符串，再将属性值转换为十进制整数，得到资源 ID。

如果 possession 参数为真，就会调用 possess 函数（这里没有给出 possess 函数的定义，但它是一个异步函数，返回一个布尔值），以检查当前用户是否有资源的拥有权。如果没有，就会返回一个错误对象。

如果以上两个条件都不成立，那么就会直接调用 next() 函数，让程序进入下一步。
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log('👮🏻 访问控制');

    //解构选项
    const { possession } = options;

    //当前用户ID
    const { id: userId } = request.user;

    //放行管理员
    if (userId == 1) return next();

    //准备资源
    const resourceIdParam = Object.keys(request.params)[0];
    const resourceType = resourceIdParam.replace('Id', '');
    const resourceId = parseInt(request.params[resourceIdParam], 10);

    //检查资源拥有权
    if (possession) {
      try {
        const ownResource = await possess({ resourceId, resourceType, userId });

        if (!ownResource) {
          return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next(error);
      }
    }
    next();
  };
};
