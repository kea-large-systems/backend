import { Model, DataTypes, Sequelize } from "sequelize";
import { Attendance } from "./attendances";
import { Class } from "./classes";
import { Role } from "./roles";

class User extends Model {}

const userInit = (sequelize: Sequelize) => {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "user_id",
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
      tableName: "users",
    }
  );
};

const userAssociationInit = () => {
  User.belongsTo(Role, {
    foreignKey: {
      name: "roleId",
      allowNull: false,
      field: "role_id",
    },
  });

  User.hasMany(Class, {
    foreignKey: {
      name: "teacherUserId",
      allowNull: false,
      field: "teacher_user_id",
    },
  });

  User.hasMany(Attendance, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
};

export { User, userInit, userAssociationInit };
