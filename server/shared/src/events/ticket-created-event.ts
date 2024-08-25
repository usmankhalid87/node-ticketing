import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface TicketCreatedEvent {
  routingKey: RoutingKeys.TicketCreated;
  exchange: Exchange.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
