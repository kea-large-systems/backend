import passport from "passport";
import { microsoftUser, userAuthentication } from "./user.authentication";

var MicrosoftStrategy = require('passport-microsoft').Strategy;

const microsoftPassportConfig = {
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.MICROSOFT_CALL_BACK_URL,
  scope: [process.env.MICROSOFT_SCOPE]
}

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