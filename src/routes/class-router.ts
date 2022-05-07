import express from "express";
import { Class } from "../models/classes";
import { responseHandler } from "../utils/response-handler";
import { GenericClassService } from "../utils/generic-service-initializer";

const router = express.Router();

router.get("/", async (_req, res) => {
  const response = await GenericClassService.findAll();
  responseHandler("Classes", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await GenericClassService.findByPk(id);
  responseHandler("Classes", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newUser = Class.build(requestObject);

  const response = await GenericClassService.save(newUser);
  responseHandler("Classes", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await GenericClassService.update(id, requestObject);
  responseHandler("Classes", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await GenericClassService.delete(id);
  responseHandler("Classes", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed class attributes
 */
const filterBody = (body: { name: any; teacherUserId: any }) => {
  const { name, teacherUserId } = body;
  return { name, teacherUserId };
};

export { router as ClassRouter };
