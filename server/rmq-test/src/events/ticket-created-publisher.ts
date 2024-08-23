import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event";
import { RoutingKeys } from "./routing-keys";
import { Exchange } from "./exchange-names";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  routingKey: RoutingKeys.TicketCreated = RoutingKeys.TicketCreated;
  exchangeName: Exchange.TicketCreated = Exchange.TicketCreated;
}
