import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/app.config';
import { connection } from '../app/database/mysql';

/**
 * 签发令牌
 */
interface SignTokenOptions {
  payload?: any;
}

export const signToken = (options: SignTokenOptions) => {
  //准备选项
  const { payload } = options;

  //签发JWT
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

  //提供JWT
  return token;
};

/**
 * 检查用户是否拥有指定资源
 */
interface PossessOptions {
  resourceId: number;
  resourceType: string;
  userId: number;
}

export const possess = async (options: PossessOptions) => {
  //准备选项，三个变量里面只会包含对应的跟变量名称相同的属性值
  const { resourceId, resourceType, userId } = options;

  //准备查询，他只是一个占位符的作用名称可以随便换的，SQL仓库里并没有这个叫做resourceType的表单，会根据 resourceType 的值来动态生成 SQL 语句，从而操作对应的表单。
  const statement = `
  SELECT COUNT(${resourceType}.id) as count
  From ${resourceType}
  WHERE ${resourceType}.id = ? AND userID= ?
  `;

  /**
   * 检查拥有权,const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);那也就是这段代码的意义一个是分别赋予前面const statement = `
    SELECT COUNT(${resourceType}.id) as count
    From ${resourceType}
    WHERE ${resourceType}.id = ? AND userID= ?
    `;中${resourceType}.id  =resourceld userid=userid
   */
  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);

  //提供检查结果
  return data[0].count ? true : false;
};
