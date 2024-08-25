import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface OrderCancelledEvent {
  routingKey: RoutingKeys.OrderCancelled;
  exchange: Exchange.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
