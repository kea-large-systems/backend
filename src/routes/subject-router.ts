import express from "express";
import { Subject } from "../models/subjects";
import { GenericClassService, GenericSubjectService } from "../utils/generic-service-initializer";
import { responseHandler } from "../utils/response-handler";
import { SubjectService } from "../services/subject-service";
import { teacherGuard } from "../authentication/user-authentication";
import { Class } from "../models/classes";

const subjectService = new SubjectService(Subject);

const router = express.Router();

// TODO - StudentSelfGuard here

// TODO - GET "/by-student/:studentId"

router.use(teacherGuard);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await GenericSubjectService.findByPk(id);
  responseHandler("Subject", response, res);
});

router.get("/", async (_req, res) => {
  const response = await GenericSubjectService.findAll();
  responseHandler("Subjects", response, res);
});

router.get("/by-teacher/:teacherId", async (req, res) => {
  const { teacherId } = req.params;

  const response = await subjectService.findByTeacherId(teacherId);
  const x = response.model! as Array<Subject>;
  const subjectClassMap = new Map<any, Subject>();
  for (var element of x) {
    const y = await GenericClassService.findByPk(element.getDataValue("classId"));
    (element as any).classId = y.model!.getDataValue("name");
  }
  
  responseHandler("Subject", response, res);
});

router.post("/", async (req, res) => {

  const requestObject = filterBody(req.body);
  const newSubject = Subject.build(requestObject);
  const response = await GenericSubjectService.save(newSubject);
  responseHandler("Subject", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);
  const response = await GenericSubjectService.update(id, requestObject);
  responseHandler("Subject", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await GenericSubjectService.delete(id);
  responseHandler("Subject", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed class attributes
 */
const filterBody = (body: { name: any; teacherUserId: any; classId: any }) => {
  const { name, teacherUserId, classId } = body;
  return { name, teacherUserId, classId };
};

export { router as SubjectRouter };
