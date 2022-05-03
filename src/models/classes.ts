import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./users";
import { Lecture } from "./lectures";

class Class extends Model {}

const classInit = (sequelize: Sequelize) => {
  Class.init(
    {
      classId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "class_id",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "classes",
    }
  );
};

const classAssociationInit = () => {
  Class.hasMany(Lecture, {
    foreignKey: {
      name: "classId",
      allowNull: false,
      field: "class_id",
    },
  });

  Class.belongsTo(User, {
    foreignKey: {
      name: "teacherUserId",
      allowNull: false,
      field: "teacher_user_id",
    },
  });
};

export { Class, classInit, classAssociationInit };
