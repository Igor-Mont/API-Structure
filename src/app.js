import express from "express";
import "dotenv/config.js";
import "./database/index.js";
import { routes } from "./routes/index.js";
import { AppError } from "./errors/appError.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
})

export { app };
