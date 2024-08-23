import { Channel } from "amqplib";
import { Event } from "./base-event";

export abstract class Publisher<T extends Event> {
  abstract routingKey: T["routingKey"];
  abstract exchangeName: T["exchange"];
  private channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async publish(data: T["data"]): Promise<void> {
    try {
      const message = JSON.stringify(data);
      await this.channel.assertExchange(this.exchangeName, "direct", {
        durable: true,
      });
      this.channel.publish(
        this.exchangeName,
        this.routingKey,
        Buffer.from(message)
      );
      console.log("Event published to routingKey", this.routingKey);
    } catch (err) {
      console.error("Failed to publish event", err);
      throw err;
    }
  }
}
