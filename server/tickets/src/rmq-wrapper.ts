import amqp, { Connection, Channel } from "amqplib";

class RabbitMQWrapper {
  private _connection?: Connection;
  private _channel?: Channel;

  get channel() {
    if (!this._channel) {
      throw new Error("Cannot access RabbitMQ channel before connecting");
    }

    return this._channel;
  }

  async connect(url: string): Promise<void> {
    this._connection = await amqp.connect(url);
    this._channel = await this._connection.createChannel();

    return new Promise((resolve, reject) => {
      this._connection?.on("error", (err: any) => {
        reject(err);
      });

      this._connection?.on("close", () => {
        console.log("RabbitMQ connection closed");
      });

      console.log("Connected to RabbitMQ");
      resolve();
    });
  }

  async close() {
    if (this._channel) {
      await this._channel.close();
    }
    if (this._connection) {
      await this._connection.close();
    }
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
