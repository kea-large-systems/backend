import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../authentication/user.authentication";
import { Role } from "../models/roles";
import { populateAttendances, populateClasses, populateLectures, populateRole, populateSubjects, populateUser } from "../utils/populate-db";

const router = Router();
// ------------------------------------------------
// Routing for: /auth/...
// ------------------------------------------------

// Authentication/Authorization route for microsoft (Our users don't navigate to this endpoint)
router.get('/microsoft', passport.authenticate('microsoft', {
  successRedirect: '/auth/login/success',
  failureRedirect: '/auth/login-failed'
}));

router.get('/login-failed', (_req, res) => {
  res.statusCode = 403
  res.send({error: 'Forbidden'});
});

router.get('/login/success', async (req, res) => {
  const role = await Role.findByPk(req.user?.roleId);
  const response = {
    userId: req.user?.userId,
    name: req.user?.name,
    email: req.user?.email,
    roleName: role?.getDataValue('name'),
  }
  res.json({user: response});
})

// login/microsoft
router.get('/login/microsoft', passport.authenticate('microsoft'));

// logout - needs to be logged, otherwise redirected to login page
router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

export {router as AuthenticationRouter}
