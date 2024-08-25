import mongoose from "mongoose";
import "express-async-errors";
import { app } from "./app";
import { rabbitMQWrapper } from "./rmq-wrapper";

const start = async () => {
  try {
    if (!process.env.RMQ_URL) {
      throw new Error("RMQ_URL must be defined!");
    }

    console.log("rabbitMQWrapper in Index : ", rabbitMQWrapper);

    await rabbitMQWrapper.connect(process.env.RMQ_URL);

    process.on("SIGINT", () => rabbitMQWrapper.channel.close());
    process.on("SIGTERM", () => rabbitMQWrapper.channel.close());

    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log("Tickets server listening at 3001");
  });
};

start();
