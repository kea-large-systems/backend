import passport from "passport";
import { microsoftPassportConfig } from "../config/config";
import { microsoftUser, userAuthentication } from "./user.authentication";

var MicrosoftStrategy = require('passport-microsoft').Strategy;

/**
 * Passport 'Init' functions for the application
 * - Init strategies available in the application
 * - Init passport serialization for cookies and session
 */
export const passportSetup = {
  microsoftStrategySetup: (): void => {
    passport.use(new MicrosoftStrategy(microsoftPassportConfig, microsoftUser));
  },
  // Add more strategies here if we want more than microsoft
  serialization: (): void => {
    userAuthentication.serialize();
    userAuthentication.deserialize();
  }
}