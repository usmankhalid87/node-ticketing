import mongoose from "mongoose";
import "express-async-errors";
import { app } from "./app";
import { rabbitMQWrapper } from "./rmq-wrapper";
import { TicketCreatedConsumer } from "./events/consumers/ticket-created-consumer";

const start = async () => {
  try {
    if (!process.env.RMQ_URL) {
      throw new Error("RMQ_URL must be defined!");
    }

    console.log("rabbitMQWrapper in Index : ", process.env.RMQ_URL);

    await rabbitMQWrapper.connect(process.env.RMQ_URL);

    process.on("SIGINT", () => rabbitMQWrapper.channel.close());
    process.on("SIGTERM", () => rabbitMQWrapper.channel.close());

    new TicketCreatedConsumer(rabbitMQWrapper.channel).consume();

    await mongoose.connect("mongodb://orders-mongo-srv:27017/orders");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3002, () => {
    console.log("orders server listening at 3002");
  });
};

start();
