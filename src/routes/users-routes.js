import { Router } from "express";
import { createUser } from "../controllers/create-user.js";
import { deleteUser } from "../controllers/delete-user.js";
import { userValidation } from "../middlewares/userValidation.js";

const usersRoutes = Router();

usersRoutes.post("/", userValidation, createUser);
usersRoutes.delete("/:id", deleteUser);

export { usersRoutes };