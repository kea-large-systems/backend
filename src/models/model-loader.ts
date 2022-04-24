import { Class } from "./classes";
import { Role } from "./roles";
import { User } from "./users";


/**
 * Creates tables in the schema defined in the ENV `DATABASE`
 * 
 * The schema MUST exist ahead of time or this will throw an error.
 */
export const syncDbTables = async () => {
  try {
    await Role.sync({ alter: true });
    await User.sync({ alter: true });
    await Class.sync({ alter: true });
    console.log("DB loaded successfully");
  } catch (e) {
    console.error(`Something went wrong while synchronizing the DB : ${e}`);
  }
};
