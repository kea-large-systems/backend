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
    // (1) This should be obsolete, trying (2) instead
    // teacherUserId: {
    //   type: DataTypes.INTEGER,
    //   field: "teacher_user_id",
    //   references: {
    //     model: "users",
    //     key: "user_id",
    //   },
    // },
  },
  {
    sequelize: sequelize_conf,
    modelName: "roles",
  }
);

// (2) Potentially this can replace (1)
User.hasMany(Class, {
  foreignKey: {
    name: "teacherUserId",
    field: "teacher_user_id",
  },
});

export { Class, initializedClass }
