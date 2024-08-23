import { Channel, ConsumeMessage } from "amqplib";
import { Event } from "./base-event";

export abstract class Consumer<T extends Event> {
  abstract routingKey: T["routingKey"];
  abstract exchangeName: T["exchange"];
  abstract queueName: string;

  abstract onMessage(data: T["data"], msg: ConsumeMessage): void;
  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async consume() {
    await this.channel.assertExchange(this.exchangeName, "direct");

    await this.channel.assertQueue(this.queueName, {
      durable: true,
      autoDelete: false,
    });

    await this.channel.bindQueue(
      this.queueName,
      this.exchangeName,
      this.routingKey
    );

    this.channel.consume(
      this.queueName,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          console.log(
            `Message received: ${this.routingKey} / ${this.queueName}`
          );
          const parsedData = this.parseMessage(msg);
          this.onMessage(parsedData, msg);
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }

  // parseMessage(msg: ConsumeMessage) {
  //   const data = msg.content.toString();
  //   return JSON.parse(data);
  // }

  parseMessage(msg: ConsumeMessage) {
    const data = msg.content;
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
