import { Model, DataTypes, Sequelize, NOW } from "sequelize";
import { Lecture } from "./lectures";
import { User } from "./users";

class Attendance extends Model {}

const attendanceInit = (sequelize: Sequelize) => {
  Attendance.init(
    {
      attendance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      attended_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    },
    {
      sequelize,
      tableName: "attendances",
    }
  );

  Lecture.hasMany(Attendance, {
    foreignKey: {
      name: "lecture_id",
      allowNull: false,
    },
  });

  User.hasMany(Attendance, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
    },
  });
};

export { Attendance, attendanceInit };
