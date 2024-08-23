import client, { Channel, Connection } from "amqplib";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

const start = async () => {
  console.clear();

  const connection: Connection = await client.connect("amqp://localhost:5672");
  console.log("Connected to RMQ");
  const channel: Channel = await connection.createChannel();
  console.log("RMQ:Channel created!");

  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(channel);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
};
start();
