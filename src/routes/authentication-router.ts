import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../authentication/user.authentication";
import { populateRole, populateUser } from "../utils/populate-db";

const router = Router();
// ------------------------------------------------
// Routing for: /auth/...
// ------------------------------------------------

// Authentication/Authorization route for microsoft (Our users don't navigate to this endpoint)
router.get('/microsoft', passport.authenticate('microsoft', {
  successRedirect: '/',
  failureRedirect: '/auth/login-failed'
}));

router.get('/login-failed', (_req, res) => {
  res.send();
})

router.get('/login', async (_req, res) => {
  await populateRole();
  await populateUser();
  res.send();
})

// login/microsoft
router.get('/login/microsoft', passport.authenticate('microsoft'));

// logout - needs to be logged, otherwise redirected to login page
router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

export {router as AuthenticationRouter}