import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || '',
  port: parseInt(process.env.DB_PORT || '', 10),
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
});

export default sequelize;
