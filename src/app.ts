// Import the express in typescript file
import express, { json } from "express";
import "dotenv/config";
import { sequelize } from "./config/mysql";
import { loadDB } from "./utils/model-loader";
import helmet from 'helmet'
import passport from 'passport'
import session from 'express-session';
import { passportSetup } from "./authentication/passportSetup";
import { AuthenticationRouter } from "./routes/authentication-router";
import { sessionConfig } from "./config/config";

import { UserRouter } from "./routes/user-router"
import { SubjectRouter } from "./routes/subject-router";
import { RoleRouter } from "./routes/role-router";
import { LectureRouter } from "./routes/lecture-router";
import { ClassCodeRouter } from "./routes/class-code-router";
import { AttendanceRouter } from "./routes/attendance-router";
import { ClassRouter } from "./routes/class-router";

const port = process.env.APP_PORT || 5000;

// Initialize the express engine
const app: express.Application = express();
app.use(json());
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
app.get("/", async (_req, res) => {
  res.send({ message: "Live and running typescript, baby" });
});

app.use("/users", UserRouter);
app.use("/subjects", SubjectRouter);
app.use("/roles", RoleRouter);
app.use("/lectures", LectureRouter);
app.use("/class-codes", ClassCodeRouter);
app.use("/classes", ClassRouter);
app.use("/attendances", AttendanceRouter);

// app.use Routes
app.use('/auth', AuthenticationRouter);

app.all("*", (_req, res) => {
  res.send({ error: 404, message: "not found" });
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express \n\t running on port: ${port}`);
});

