import { Router } from "express";
import { createUser } from "../controllers/create-user.js";
import { deleteUser } from "../controllers/delete-user.js";
import { updateUser } from "../controllers/update-user.js";
import { userValidation } from "../middlewares/userValidation.js";

const usersRoutes = Router();

usersRoutes.post("/", userValidation, createUser);
usersRoutes.patch("/:id", userValidation, updateUser);
usersRoutes.delete("/:id", deleteUser);

export { usersRoutes };