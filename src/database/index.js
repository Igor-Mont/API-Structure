import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connected with database 📦"))
  .catch((err) => console.error(err));
