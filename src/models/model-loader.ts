import { Sequelize } from "sequelize";
import { userInit } from "./users";
import { classInit } from "./classes";
import { roleInit } from "./roles";
import { exit } from "process";

/**
 * Creates or updates tables in the schema defined in the ENV `DATABASE`
 *
 * The schema MUST exist ahead of time or this will throw an error.
 */
const loadDB = async (sequelize: Sequelize) => {
  testDbConnection(sequelize).then(syncModels);
};

/**
 * Tries to connect to the database with the provided sequelize config.
 *
 * If an error occurs it will return null.
 *
 * @param sequelize An initialized Sequelize object with db connection
 *
 * @returns {Promise<Sequelize | null >}
 */
const testDbConnection = async (sequelize: Sequelize): Promise<Sequelize | null> => {
  console.log("Attempting to connect to the database...");
  try {
    await sequelize.authenticate();
    console.log(`Successfully connected to the database`);
    return sequelize;
  } catch (e) {
    console.error(`Failed to connect to Database: ${e}`);
    return null;
  }
};

/**
 * Attempts to synchronize the local models with the database.
 *
 * It will only attempt to do so, if the parameter passed is of
 * type Sequelize, else it will skip it and exit.
 *
 * @param sequelize An initialized Sequelize object with db connection
 */
const syncModels = async (sequelize: Sequelize | null) => {
  if (sequelize) {
    try {
      console.log("Attempting to sync the models to the database...");
      roleInit(sequelize);
      userInit(sequelize);
      classInit(sequelize);

      await sequelize.sync({ alter: true });
      console.log("Database synced successfully ");
    } catch (e) {
      console.error(`Something went wrong while synchronizing the DB : ${e}`);
      exit(2);
    }
  } else {
    console.log("Skipping sync, db not connected");
    exit(1);
  }
};

export { loadDB };
