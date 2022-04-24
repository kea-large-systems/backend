// Import the express in typescript file
import express from "express";
import "dotenv/config";
import helmet from 'helmet'
import passport from 'passport'
import session from 'express-session';

import { passportSetup } from "./authentication/passportSetup";

import { authenticationRoutes } from "./routes/authentication.routes";



const port = process.env.APP_PORT || 5000;

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
// Don't change the order of the passport config calls
app.use(passport.initialize());
app.use(passport.session());
passportSetup.microsoftStrategySetup();
passportSetup.serialization();
// __________________________________________________________________________________

// Handling '/' Request
app.get("/", (req, res) => {
  res.send({ message: "Live and running typescript, baby", user: req.user });
});

// app.use Routes
app.use('/auth', authenticationRoutes);


app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         Running on port: ${port}`);
});
