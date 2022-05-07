// Import the express in typescript file
import express from "express";
import "dotenv/config";
import { sequelize } from "./config/mysql";
import { loadDB } from "./utils/model-loader";
import helmet from 'helmet'
import passport from 'passport'
import session from 'express-session';
import { passportSetup } from "./authentication/passportSetup";
import { AuthenticationRouter } from "./routes/authentication.routes";
import { sessionConfig } from "./config/config";

const port = process.env.APP_PORT || 5000;

// Initialize the express engine
const app: express.Application = express();

loadDB(sequelize);

// Always use a helmet (Security reasons: https://expressjs.com/en/advanced/best-practice-security.html)
app.use(helmet());
app.use(session(sessionConfig))

// ________________________________ PASSPORT CONFIG ________________________________
// Don't change the order of the passport config calls
app.use(passport.initialize());
app.use(passport.session());
passportSetup.microsoftStrategySetup();
passportSetup.serialization();
// __________________________________________________________________________________


// Handling '/' Request
app.get("/", (_req, res) => {
  res.send({ message: "Live and running typescript, baby" });
});

// app.use Routes
app.use('/auth', AuthenticationRouter);


app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express \n\t running on port: ${port}`);
});

