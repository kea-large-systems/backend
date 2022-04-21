import { Model, DataTypes } from "sequelize";
import { sequelize_conf } from "../config/mysql";

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'role_id'
    },
    name: {
      type: DataTypes.ENUM('student', 'teacher'),
      allowNull: false,
    }
  },
  {
    sequelize: sequelize_conf,
    modelName: "roles",
  }
);