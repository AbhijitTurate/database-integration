// connection to db
// start app

import mongoose from "mongoose";
import Task from "./models/Task";
import dotenv from "dotenv";
import app from "./app";
import sendErrorResponse from "./middlewares/sendErrorResponse";
dotenv.config();
const { DB_LOCAL , PORT } = process.env;

app.use(sendErrorResponse);

mongoose
  .connect('mongodb://localhost:27017/Training-Class-2022', {})
  .then((connection) => {
    return app.listen(PORT || 3000, () => {
      console.log("server started on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Error in connecting", err);
  });
