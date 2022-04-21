import { Model, DataTypes } from "sequelize";
import { sequelize_conf } from "../../config/mysql";
import { User } from "../users/users";

class Class extends Model {}

const initializedClass = Class.init(
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
    sequelize: sequelize_conf,
    modelName: "classes",
  }
);

User.hasMany(Class, {
  foreignKey: {
    name: "teacherUserId",
    field: "teacher_user_id",
  },
});

export { Class, initializedClass };
