import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize(`${process.env.database}`, `${process.env.username}`, `${process.env.password}`, {
  host: `${process.env.host}`,
  dialect: "mysql",
});
class User extends Model {}

const initialized_user = User.init(
  {
    id: {
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
      type: DataTypes.CHAR,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

export { sequelize, User, initialized_user };
