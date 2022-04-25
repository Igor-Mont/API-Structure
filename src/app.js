import express from "express";
import "dotenv/config.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

export { app };
