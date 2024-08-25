import {
  RoutingKeys,
  Consumer,
  TicketCreatedEvent,
  Exchange,
} from "@usmankhalid87/ticketing-shared";
import { Ticket } from "../../models/ticket";
import { ConsumeMessage } from "amqplib";

export class TicketCreatedConsumer extends Consumer<TicketCreatedEvent> {
  routingKey: RoutingKeys.TicketCreated = RoutingKeys.TicketCreated;
  exchangeName: Exchange.TicketCreated = Exchange.TicketCreated;
  queueName: string = "tickets-queue";

  async onMessage(data: TicketCreatedEvent["data"], msg: ConsumeMessage) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
  }
}
