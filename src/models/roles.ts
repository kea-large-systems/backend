import { Model, DataTypes, Sequelize } from "sequelize";

class Role extends Model {}

const roleInit = (sequelize: Sequelize) =>
  Role.init(
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
      sequelize,
      modelName: "roles",
    }
  );

export { Role, roleInit };
