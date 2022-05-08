import express from "express";
import { Lecture } from "../models/lectures";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const LectureService = new ModelService(Lecture);

router.get("/", async (_req, res) => {
  const response = await LectureService.findAll();
  responseHandler("Lectures", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await LectureService.findByPk(id);
  responseHandler("Lecture", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newLecture = Lecture.build(requestObject);

  const response = await LectureService.save(newLecture);
  responseHandler("Lecture", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await LectureService.update(id, requestObject);
  responseHandler("Lecture", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await LectureService.delete(id);
  responseHandler("Lecture", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed user attributes
 */
const filterBody = (body: {
  name: any;
  startedAt: any;
  endedAt: any;
  classId: any;
}) => {
  const { name, endedAt, startedAt, classId } = body;
  return { name, endedAt, startedAt,  classId };
};

export { router as LectureRouter };
