import { Model, DataTypes } from "sequelize";
import { sequelize_conf } from "../../config/mysql";

class User extends Model {}

const initialized_user = User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },
  },
  {
    sequelize: sequelize_conf,
    modelName: "users",
  }
);

export { sequelize_conf as sequelize, User, initialized_user };
