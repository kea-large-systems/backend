import express from "express";
import { User } from "../models/users";
import { ModelService } from "../services/model-service";

const router = express.Router();
const UserService = new ModelService(User);

router.get("/", async (_req, res) => {
  const userList = await UserService.findAll();
  res.status(200).send(userList);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserService.findByPk(id);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ error: 404, message: "User not found." });
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const newUser = User.build(requestObject);
  const createdUser = await UserService.save(newUser);

  if (createdUser) {
    res.status(200).send(createdUser);
  } else {
    res.status(500).send({ error: 500, message: "Unable to save new user." });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const updatedUser = await UserService.update(id, requestObject);
  if (updatedUser) {
    res.status(200).send(updatedUser);
  } else {
    res.status(500).send({ error: 500, message: "Unable to update user." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const userToDelete = await UserService.delete(id);
  if (userToDelete) {
    res.status(200).send({status: 200, message: "User deleted."})
  } else {
    res.status(500).send({status: 500, message: "Unable to delete user."})
  }
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
