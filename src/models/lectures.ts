import { Model, DataTypes, Sequelize } from "sequelize";
import { Attendance } from "./attendances";
import { Subject } from "./subjects";

class Lecture extends Model {
  declare lectureId: number;
}

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
        defaultValue: Sequelize.fn("NOW"),
        field: "started_at",
      },
      endedAt: {
        type: DataTypes.DATE,
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
  Lecture.belongsTo(Subject, {
    foreignKey: {
      name: "subjectId",
      allowNull: false,
      field: "subject_id",
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
