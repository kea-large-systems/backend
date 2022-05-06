import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./users";

class Role extends Model {}

const roleInit = (sequelize: Sequelize) => {
  Role.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "role_id",
      },
      name: {
        type: DataTypes.ENUM("student", "teacher"),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "roles",
    }
  );
};

const roleAssociationInit = () => {
  Role.hasMany(User, {
    foreignKey: {
      name: "roleId",
      allowNull: false,
      field: "role_id",
    },
  });
};

export { Role, roleInit, roleAssociationInit };
