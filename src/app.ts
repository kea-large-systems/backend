// Import the express in typescript file
import express from "express";
import "dotenv/config";
import helmet from 'helmet'

// Needed for passport, but is useful in more scenarios.
const session = require('express-session');

// ________________________________ PASSPORT FILES ________________________________ 
import passport from 'passport'
var MicrosoftStrategy = require('passport-microsoft').Strategy;
const passportConfig = require('../config.js');
// ________________________________________________________________________________

const port = process.env.APP_PORT || 4200;

// Initialize the express engine
const app: express.Application = express();

// Always use a helmet (Security reasons: https://expressjs.com/en/advanced/best-practice-security.html)
app.use(helmet());

app.use(session({
  secret: 'roll-call-legendary-app', // salt, make session id's harder to crack, value can be anything
  resave: false,  // need to look further into it, "... Typically, you'll want false"
  saveUninitialized: true, // Forces session that is uninitialized to be saved to the store.
  cookie: {secure: false} // recommended true, but requires https for cookie save, can be based on env
}))

// ________________________________ PASSPORT CONFIG ________________________________

app.use(passport.initialize());
app.use(passport.session());

passport.use(new MicrosoftStrategy(passportConfig,
  function(_accessToken: any, _refreshToken: any, profile: any, done: any) {
    return done(null, profile);    
  }
));

passport.serializeUser((user, cb) => {
  console.log("________________________ Serialze User ________________________");
  console.log(user);
  console.log("________________________ _____________ ________________________");
  cb(null, user);
});
passport.deserializeUser((user: Express.User, cb) => {
  console.log("________________________ Deserialze User ________________________");
  console.log(user);
  console.log("________________________ _______________ ________________________");
  cb(null, user);
});
// __________________________________________________________________________________


// Handling '/' Request
app.get("/", (req, res) => {
  console.log("User info", req.user);
  
  res.send({ message: "Live and running typescript, baby" });
});

// _______________________ Testing Authentication with passport _______________________
app.get('/login', passport.authenticate('microsoft'),(res, req) => {
  console.log(req, res);
});

// Difference is that we're going to send it an object
// 4200  /auth/microsoft?code=
app.get('/auth/microsoft', passport.authenticate('microsoft', {
  successRedirect: '/',
  failureRedirect: '/loginFailed'
}));
// ____________________________________________________________________________________

app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         Running on port: ${port}`);
});
