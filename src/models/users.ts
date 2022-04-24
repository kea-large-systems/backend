import { Model, DataTypes, Sequelize } from "sequelize";
import { Role } from "./roles";

class User extends Model {}

const userInit = (sequelize: Sequelize) => {
  User.init(
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
      sequelize,
      modelName: "users",
    }
  );

  Role.hasMany(User, {
    foreignKey: {
      name: "roleId",
      field: "role_id",
    },
  });
};

export { User, userInit };
