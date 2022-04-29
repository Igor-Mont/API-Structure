import express from "express";
import "dotenv/config.js";
import "./database/index.js";
import { routes } from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

export { app };
