import { Consumer } from "./base-consumer";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";
import { ConsumeMessage } from "amqplib";

export class TicketCreatedConsumer extends Consumer<TicketCreatedEvent> {
  routingKey: RoutingKeys.TicketCreated = RoutingKeys.TicketCreated;
  exchangeName: Exchange.TicketCreated = Exchange.TicketCreated;
  queueName: "tickets-queue";

  onMessage(data: TicketCreatedEvent["data"], msg: ConsumeMessage) {
    console.log("Event data!", data);
    console.log(data.id);
    console.log(data.title);
    console.log(data.price);
  }
}
