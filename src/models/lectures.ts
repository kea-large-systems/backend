import { Model, DataTypes, Sequelize } from "sequelize";
import { Attendance } from "./attendances";
import { Class } from "./classes";

class Lecture extends Model {}

const lectureInit = (sequelize: Sequelize) => {
  Lecture.init(
    {
      lectureId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "lecture_id",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
        field: "started_at",
      },
      endedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("(NOW() + interval 90 minute)"), 
        field: "ended_at",
      },
    },
    {
      sequelize,
      tableName: "lectures",
    }
  );
};

const lectureAssociationInit = () => {
  Lecture.belongsTo(Class, {
    foreignKey: {
      name: "classId",
      allowNull: false,
      field: "class_id",
    },
  });

  Lecture.hasMany(Attendance, {
    foreignKey: {
      name: "lectureId",
      allowNull: false,
      field: "lecture_id",
    },
  });
};

export { Lecture, lectureInit, lectureAssociationInit };
