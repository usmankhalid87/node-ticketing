import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { RoutingKeys } from "./routing-keys";

interface Event {
  routingKey: RoutingKeys;
  data: any;
}

export abstract class Consumer<T extends Event> {
  abstract routingKey: T["routingKey"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: ConsumeMessage): void;
  protected channel: Channel;
  private ackWait = 5 * 1000;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async listen() {
    await this.channel.assertQueue(this.queueGroupName, {
      durable: true,
    });

    await this.channel.bindQueue(this.queueGroupName, this.routingKey, "");

    this.channel.consume(
      this.queueGroupName,
      (msg: ConsumeMessage | null) => {
        if (msg) {
          console.log(
            `Message received: ${this.routingKey} / ${this.queueGroupName}`
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

  parseMessage(msg: ConsumeMessage) {
    const data = msg.content.toString();
    return JSON.parse(data);
  }
}
