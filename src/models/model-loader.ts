import { Sequelize } from "sequelize";
import { User, userInit } from "./users";
import { Class, classInit } from "./classes";
import { Role, roleInit } from "./roles";

/**
 * Creates tables in the schema defined in the ENV `DATABASE`
 *
 * The schema MUST exist ahead of time or this will throw an error.
 */
const loadDB = async (sequelize: Sequelize) => {
  try {
    // console.log(sequelize);

    roleInit(sequelize);
    userInit(sequelize);
    classInit(sequelize);

    await User.sync({ alter: true });
    await Role.sync({ alter: true });
    await Class.sync({ alter: true });
    console.log("DB loaded successfully");
  } catch (e) {
    console.error(`Something went wrong while synchronizing the DB : ${e}`);
  }
};

export { loadDB };
