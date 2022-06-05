import { subjectInit } from "../../src/models/subjects";
import { sequelize } from "../../src/config/mysql";
import request from "supertest";
import { SubjectRouter } from "../../src/routes/subject-router";
import { TEACHER_ROLE_ID } from "../../src/config/constants";
import express from "express";
import passport from "passport";
/*INSERT INTO subjects VALUES(1,  "Testing SW20",         1, 1);*/
describe("test subject router", ()=> {
  beforeAll(() => {
    subjectInit(sequelize);
  });

  test("checks router subject return the expected subject", ()=> {
    const app= express();
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next)=>{
      console.log("middleware-----------------------------------------------------------------------");
      req.isAuthenticated = ()=> true
      req.user= { email: "abcd@test.com", name: "big fart", roleId: TEACHER_ROLE_ID, userId: "1" };
      next();
    });
    app.use(SubjectRouter)
    request(app).get("/1")
      .expect(200, {subjectId: 2}).then(res => {
            console.log("res: ", res);
    }).catch(error => {
      console.error(error)
    });
  })
})