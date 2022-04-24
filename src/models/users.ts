import { Model, DataTypes } from "sequelize";
import { sequelize_conf } from "../config/mysql";
import { Role } from "./roles";

class User extends Model {}

const initializedUser = User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize_conf,
    modelName: "users",
  }
);

Role.hasMany(User, {
  foreignKey: {
    name: "roleId",
    field: "role_id",
  },
});

export { User, initializedUser };
