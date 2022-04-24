import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Didn't work to have it in the global file.
declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number;
    }
  }
}

/**
 * Checks if user is authenticated
 * - If yes: go to next()
 * - If no: redirect to /auth/login
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/auth/login');
};

/**
 * Microsoft sends us user details during the authentication process
 * - Save user into our database
 * @param _accessToken 
 * @param _refreshToken 
 * @param profile user profile from microsoft
 * @param done 
 * @returns confirmation to microsoft that it was successful or that we got an error
 * -- NOT FULLY IMPLEMENTED (need to connect to DB)
 */
export const microsoftUser = (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
  // Here we need implement logic of finding or saving user from/to db 
  return done(null, profile);    
}

/**
 * Handles authentication of users with session and cookies
 */
export const userAuthentication = {
  /**
   * Called during the authentication with the third party auth service
   * - Saves user.id in the session
   * - Saves user.id in client cookie
   */
  serialize: (): void => {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  },
  /**
   * Called in every request from the client
   * - passes cookie with user.id
   * - checks if user exists in our database
   * -- NOT FULLY IMPLEMENTED (Need to connect with DB)
   */
  deserialize: (): void => {
    passport.deserializeUser((id: Express.User, done) => {
      // TODO: Implement getUserFromDatabaseFunction here, and nest done within it
      done(null, id); //pass in user obj from db once implemented, it's checking based on true/false
    });
  }
}
