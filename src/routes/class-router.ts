import express from "express";
import { Class } from "../models/classes";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const ClassService = new ModelService(Class);

router.get("/", async (_req, res) => {
  const response = await ClassService.findAll();
  responseHandler("Classes", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await ClassService.findByPk(id);
  responseHandler("Classes", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newUser = Class.build(requestObject);

  const response = await ClassService.save(newUser);
  responseHandler("Classes", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await ClassService.update(id, requestObject);
  responseHandler("Classes", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await ClassService.delete(id);
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

export { router as ClassRouter };
