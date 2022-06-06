import { subjectInit } from "../../src/models/subjects";
import request from "supertest";
import { SubjectRouter } from "../../src/routes/subject-router";
import { TEACHER_ROLE_ID } from "../../src/config/constants";
import express, { json } from "express";
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
  app.use(json());
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
  describe("/:subjectId", () => {
    test("Id that exists in database", async () => {
      const response = await request(app)
        .get("/1");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ name: "Testing SW20", subjectId: 1 });
    });
    test("ID that does not exist in the database", async () => {
      const response = await request(app)
        .get("/30");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Subject not found.");
    });
    test("ID that does not following the format", async () => {
      const response = await request(app)
        .get("/notId");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Subject not found.");
    });
  });

  describe("/", () => {
    test("Gets all subject from db", async () => {
      const response = await request(app)
        .get("/");
      expect(response.status).toBe(200);
      expect((response.body as Array<unknown>).sort()).toStrictEqual(expectedAllSubjects.sort());
    });
  });
/*

  describe("post /", () => {
    test("checks create new subject", async () => {
      const response = await request(app)
        .post("/").send({ name: "test post", classId: "1", teacherUserId: "1" });
      console.log(response.body);
      console.log(response.status);
    });
  });

  test("checks router subject with id that does not following the format", async () => {
    const response = await request(app)
      .get("/");
    expect(response.status).toBe(200);
    expect((response.body as Array<unknown>).length).toBe(12);
  });
*/
});

afterAll(() => {
  sequelize.close();
});

const expectedAllSubjects = [
  { subjectId: 1, name: "Testing SW20"},
  { subjectId: 2, name: "Testing SW21"},
  { subjectId: 3, name: "Testing SW22"},
  { subjectId: 4, name: "Web Development WD20"},
  { subjectId: 5, name: "Web Development WD21"},
  { subjectId: 6, name: "Web Development WD22"},
  { subjectId: 7, name: "Databases SW20"},
  { subjectId: 8, name: "Databases SW21"},
  { subjectId: 9, name: "Databases SW22"},
  { subjectId: 10, name: "Large Systems SW20"},
  { subjectId: 11, name: "Large Systems SW21"},
  { subjectId: 12, name: "Large Systems SW22"},
];