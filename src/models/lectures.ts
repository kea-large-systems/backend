import { NOW, Model, DataTypes, Sequelize } from "sequelize";
import { Class } from "./classes";

class Lecture extends Model {}

const lectureInit = (sequelize: Sequelize) => {
  Lecture.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      started_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
      },
      ended_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "lectures",
    }
  );

  Class.hasMany(Lecture, {
    foreignKey: {
      name: "class_id",
      allowNull: false,
    },
  });
};

export { Lecture, lectureInit };
