import express from "express";
import { Class } from "../models/classes";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const ClassesService = new ModelService(Class);

router.get("/", async (_req, res) => {
  const response = await ClassesService.findAll();
  responseHandler("Classes", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await ClassesService.findByPk(id);
  responseHandler("Classes", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newUser = Class.build(requestObject);

  const response = await ClassesService.save(newUser);
  responseHandler("Classes", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await ClassesService.update(id, requestObject);
  responseHandler("Classes", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await ClassesService.delete(id);
  responseHandler("Classes", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed user attributes
 */
const filterBody = (body: {
  classId: any;
  name: any;
  teatcherUserId: any;
  roleId: any;
}) => {
  const { classId, name, teatcherUserId } = body;
  return { classId, name, teatcherUserId };
};

export { router as ClassesRouter };
