import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';

class Partner extends Model {
  public id!: number;
  public nombre!: string;
  public company!: string;
  public type!: string;
}

Partner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Partner',
    tableName: 'partners',
  }
);

export default Partner;