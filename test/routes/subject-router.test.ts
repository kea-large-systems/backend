import { subjectAssociationInit, subjectInit } from "../../src/models/subjects";
import request from "supertest";
import { SubjectRouter } from "../../src/routes/subject-router";
import { TEACHER_ROLE_ID } from "../../src/config/constants";
import express, { json } from "express";
import passport from "passport";
import { Sequelize } from "sequelize";
import { loadDB } from "../../src/utils/model-loader";
import { Express } from "express-serve-static-core";
import "dotenv/config"

let app: Express;
let sequelize: Sequelize;
const {DB_USERNAME,DB_PASSWORD,DB_HOST,DATABASE} = process.env;
describe("test subject router", () => {

	beforeAll(async () => {
		sequelize = new Sequelize(DATABASE!, DB_USERNAME!, DB_PASSWORD!, {
      host: DB_HOST!,
      dialect: "mysql",
      logging: false,
      define: {
        timestamps: false,
      },
    });

		await loadDB(sequelize);

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
	});

  describe("/:subjectId", () => {
    test("Id that exists in database", async () => {
      const response = await request(app)
        .get("/1");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ name: "Testing SW20", subjectId: 1, classId: 1, teacherUserId: 1 });
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

  describe("post /", () => {
    test("checks create new subject", async () => {
      const response = await request(app)
        .post("/").send({ name: "test post", classId: "1",  teacherUserId: "1" });
			expect(response.status).toBe(201);
			expect(response.body).toStrictEqual({ subjectId: 13, name: 'test post', teacherUserId: '1', classId: '1' });
    });
		test("checks create new subject", async () => {
      const response = await request(app)
        .post("/").send({ name: "test post", classId: "1",  teacherUserId: "1" });
			expect(response.status).toBe(201);
			expect(response.body).toStrictEqual({ subjectId: 13, name: 'test post', teacherUserId: '1', classId: '1' });
    });
  });

  describe("patch /:subjectId", ()=> {
    test("checks update subject", ()=> {})
  })

  describe("delete /:subject", ()=> {
    test("delete subject", ()=>{})
  })

	afterAll(() => {
		sequelize.close();
	});
});

const expectedAllSubjects = [
	{ subjectId: 1, name: "Testing SW20", teacherUserId: 1, classId: 1 },
  { subjectId: 2, name: "Testing SW21", teacherUserId: 1, classId: 3 },
  { subjectId: 3, name: "Testing SW22", teacherUserId: 1, classId: 5 },
  { subjectId: 4, name: "Web Development WD20", teacherUserId: 2, classId: 2 },
  { subjectId: 5, name: "Web Development WD21", teacherUserId: 2, classId: 4 },
  { subjectId: 6, name: "Web Development WD22", teacherUserId: 2, classId: 6 },
  { subjectId: 7, name: "Databases SW20", teacherUserId: 3, classId: 1 },
  { subjectId: 8, name: "Databases SW21", teacherUserId: 3, classId: 3 },
  { subjectId: 9, name: "Databases SW22", teacherUserId: 3, classId: 5 },
  { subjectId: 10, name: "Large Systems SW20", teacherUserId: 4, classId: 1 },
  { subjectId: 11, name: "Large Systems SW21", teacherUserId: 4, classId: 3 },
  { subjectId: 12, name: "Large Systems SW22", teacherUserId: 4, classId: 5 },
];