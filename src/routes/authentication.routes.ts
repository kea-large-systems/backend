import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../authentication/user.authentication";


export const authenticationRoutes = Router();
// ------------------------------------------------
// Routing for: /auth/...
// ------------------------------------------------

// Authentication/Authorization route for microsoft (Our users don't navigate to this endpoint)
authenticationRoutes.get('/microsoft', passport.authenticate('microsoft', {
  successRedirect: '/auth/super-secret',
  failureRedirect: '/auth/login-failed'
}));

// login-failed
// TODO: Remove dummy error text once we have something better
authenticationRoutes.get('/login-failed', (_req, res) => {
  res.send(`<h3>Failed to login</h3> <br> <p>Try again</p> <a href="/auth/login/microsoft">Login with microsoft</a>`);
})

// login
// TODO: Remove dummy login text once login page is ready
authenticationRoutes.get('/login', (_req, res) => {
  res.send(`<h3>Login page</h3> <br> <a href="/auth/login/microsoft">Login with microsoft</a>`);
})

// login/microsoft
authenticationRoutes.get('/login/microsoft', passport.authenticate('microsoft'));

// logout - needs to be logged, otherwise redirected to login page
authenticationRoutes.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

// Testing that the authentication works: 
authenticationRoutes.get('/super-secret', isAuthenticated, (req, res) => {
  res.send(`<h3>Super secret things on this page, you are authenticated</h3> <br> <h4>user: ${JSON.stringify(req.user)}</h4>`);
})
