import { Router } from "express";

const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
  return response.json({ message: "Users routes" });
});

export { usersRoutes };