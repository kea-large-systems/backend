import { Model, DataTypes } from "sequelize";
import { sequelize_conf } from "../../config/mysql";

class Role extends Model {}

const initializedRole = Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize_conf,
    modelName: "roles",
  }
);

export { Role, initializedRole };
