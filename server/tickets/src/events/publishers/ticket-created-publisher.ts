import {
  Exchange,
  Publisher,
  RoutingKeys,
  TicketCreatedEvent,
} from "@usmankhalid87/ticketing-shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  routingKey: RoutingKeys.TicketCreated = RoutingKeys.TicketCreated;
  exchangeName: Exchange.TicketCreated = Exchange.TicketCreated;
}
