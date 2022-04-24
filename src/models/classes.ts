import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./users";

class Class extends Model {}

const classInit = (sequelize: Sequelize) => {
  Class.init(
    {
      class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "classes",
    }
  );

  User.hasMany(Class, {
    foreignKey: {
      name: "teacherUserId",
      field: "teacher_user_id",
    },
  });
};

export { Class, classInit };
