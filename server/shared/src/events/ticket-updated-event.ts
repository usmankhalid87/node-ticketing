import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface TicketUpdatedEvent {
  routingKey: RoutingKeys.TicketUpdated;
  exchange: Exchange.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
