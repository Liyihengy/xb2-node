import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { sqlFragment } from './post.provider';

/**
 * 获取内容列表
 */
export interface GetPostOptionsFilter {
  name: string;
  sql?: string;
  param?: string;
}

interface GetPostsOptions {
  sort?: string;
  filter?: GetPostOptionsFilter;
}

export const getPosts = async (options: GetPostsOptions) => {
  const { sort, filter } = options;
  //sql参数,Array的意思是数组里面的任意类型
  let params: Array<any> = [];

  //设置sql参数
  if (filter.param) {
    params = [filter.param, ...params];
  }

  const statement = `
  SELECT
  post.id,
  post.title,
  post.content,
  ${sqlFragment.user},
  ${sqlFragment.totalComments},
  ${sqlFragment.file},
  ${sqlFragment.tags}
  FROM post
  ${sqlFragment.leftJoinUser}
  ${sqlFragment.leftJoinOneFile}
  ${sqlFragment.leftJoinTag}
  WHERE ${filter.sql}
  GROUP BY post.id
  ORDER BY ${sort} 
  `;
  console.log(`${sqlFragment.totalComments}`);
  const [data] = await connection.promise().query(statement, params);

  return data;
};

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  //准备查询
  const statement = `
  INSERT INTO post 
  SET ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, post);

  //提供数据
  return data;
};

/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
  //准备查询
  const statement = `
  UPDATE post
  SET ?
  WHERE id = ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);

  //返回数据
  return data;
};

/**
 * 删除内容接口
 */
export const deletePost = async (postId: number) => {
  //准备查询
  const statement = `
  DELETE FROM post
  WHERE id =?`;
  //执行查询
  const [data] = await connection.promise().query(statement, postId);
  //提供数据
  return data;
};

/**
 * 保存内容标签
 */
export const createPostTag = async (postId: number, tagId: number) => {
  //准备查询
  const statement = `
  INSERT INTO post_tag(postId,tagId)
  VALUES(?,?)
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  //提供数据
  return data;
};

/**
 * 检查内容标签
 */
export const postHasTag = async (postId: number, tagId: number) => {
  //准备查询
  const statement = `
  SELECT * FROM post_tag
  WHERE postId = ? AND tagId = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  //提供数据
  return data[0] ? true : false;
};
