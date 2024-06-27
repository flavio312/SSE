import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';

class Producto extends Model {
  public id!: number;
  public nombre!: string;
  public cantidad!: number;
  public precio!: number;
}

Producto.init(
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
  }
);

export default Producto;