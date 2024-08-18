import mongoose from "mongoose";
import "express-async-errors";

import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/tickets");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log("Auth server listening at 3001");
  });
};

start();
