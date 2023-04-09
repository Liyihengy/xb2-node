import dotenv from 'dotenv';

//config方法就会导入.env里面所配置的环境变量
dotenv.config();

/**
 * 应用配置
 */
export const { APP_PORT } = process.env;
