import client, { Channel, Connection } from "amqplib";
import { TicketCreatedConsumer } from "./events/ticket-created-consumer";

const start = async () => {
  console.clear();

  const connection: Connection = await client.connect("amqp://localhost:5672");
  console.log("Connected to RMQ");
  const channel: Channel = await connection.createChannel();
  console.log("RMQ:Channel created!");
  new TicketCreatedConsumer(channel).consume();

  process.once("SIGINT", async () => {
    console.log("Closing RMQ Connection");
    await channel.close();
    await connection.close();
    console.log("Closed RMQ Connection");
  });
};

start();
