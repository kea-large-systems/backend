import { Sequelize } from "sequelize";

// sequelize connection to mysql
export const sequelize_conf = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.USERNAME}`,
  `${process.env.PASSWORD}`,
  {
    host: `${process.env.HOST}`,
    dialect: "mysql",
    logging: false,
  }
);
