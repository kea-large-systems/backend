import { subjectInit } from "../../src/models/subjects";
// import { sequelize } from "../../src/config/mysql";
import request from "supertest";
import { SubjectRouter } from "../../src/routes/subject-router";
import { TEACHER_ROLE_ID } from "../../src/config/constants";
import express from "express";
import passport from "passport";
import { Sequelize } from "sequelize";
import { loadDB } from "../../src/utils/model-loader";
import { Express } from "express-serve-static-core";

/*INSERT INTO subjects VALUES(1,  "Testing SW20",         1, 1);*/


let app: Express;
let sequelize: Sequelize;
beforeAll(async () => {
  sequelize = new Sequelize("large_systems_mandatory", "alex", "45061", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
    },
  });
  app = express();

  app.use(passport.initialize());
  app.use((req, res, next) => {
    req.isAuthenticated = () => true;
    req.user = {
      email: "abcd@test.com",
      name: "big fart",
      roleId: TEACHER_ROLE_ID,
      userId: "1",
    };
    next();
  });

  app.use(SubjectRouter);
  await loadDB(sequelize);
  subjectInit(sequelize);
});

describe("test subject router", () => {
  test("checks router subject return the expected subject", async () => {
   await request(app)
      .get("/1")
      .expect(200, { subjectId: 1, name: "Testing SW20" });
  });
});

afterAll(() => {
  sequelize.close();
});
