import express from "express";
import { Subject } from "../models/subjects";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const SubjectService = new ModelService(Subject);

router.get("/", async (_req, res) => {
  const response = await SubjectService.findAll();
  responseHandler("Subjects", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await SubjectService.findByPk(id);
  responseHandler("Subjects", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newUser = Subject.build(requestObject);

  const response = await SubjectService.save(newUser);
  responseHandler("Subjects", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await SubjectService.update(id, requestObject);
  responseHandler("Subjects", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await SubjectService.delete(id);
  responseHandler("Subjects", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed class attributes
 */
const filterBody = (body: {
  name: any;
  teatcherUserId: any;
}) => {
  const { name, teatcherUserId } = body;
  return { name, teatcherUserId };
};

export { router as SubjectRouter };
