import { Sequelize } from "sequelize";

// sequelize connection to mysql
export const sequelize_conf = new Sequelize(`${process.env.database}`, `${process.env.username}`, `${process.env.password}`, {
    host: `${process.env.host}`,
    dialect: "mysql",
  });