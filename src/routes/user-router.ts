import express from "express";
import { User } from "../models/users";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const UserService = new ModelService(User);

router.get("/", async (_req, res) => {
  const response = await UserService.findAll();
  responseHandler("Users", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await UserService.findByPk(id);
  responseHandler("User", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newUser = User.build(requestObject);

  const response = await UserService.save(newUser);
  responseHandler("User", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await UserService.update(id, requestObject);
  responseHandler("User", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await UserService.delete(id);
  responseHandler("User", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed user attributes
 */
const filterBody = (body: {
  name: any;
  email: any;
  password: any;
  roleId: any;
}) => {
  const { name, email, password, roleId } = body;
  return { name, email, password, roleId };
};

export { router as UserRouter };
