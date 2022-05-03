import { MongoHelper } from "./database/mongo-helper.js";
import { app } from "./app.js";

const PORT = process.env.PORT;

MongoHelper.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, console.log(`Server is running on port ${PORT} 🔥`));
  })


