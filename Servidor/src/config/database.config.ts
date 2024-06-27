import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Tienda', 'tienda', 'tienda123', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
