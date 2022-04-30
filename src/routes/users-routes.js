import { Router } from "express";
import { userValidation } from "../middlewares/userValidation.js";

const usersRoutes = Router();

usersRoutes.post("/", userValidation, (request, response) => {
  return response.json({ message: "Users routes" });
});

export { usersRoutes };