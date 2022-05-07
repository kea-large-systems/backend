import express from "express";
import { Role } from "../models/roles";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const RoleService = new ModelService(Role);

router.get("/", async (_req, res) => {
  const response = await RoleService.findAll();
  responseHandler("Roles", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await RoleService.findByPk(id);
  responseHandler("Role", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newRole = Role.build(requestObject);

  const response = await RoleService.save(newRole);
  responseHandler("Role", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await RoleService.update(id, requestObject);
  responseHandler("Role", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await RoleService.delete(id);
  responseHandler("Role", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed user attributes
 */
const filterBody = (body: {
  name: any;
}) => {
  const { name } = body;
  return { name };
};

export { router as RoleRouter };
