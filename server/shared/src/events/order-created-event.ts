import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  routingKey: RoutingKeys.OrderCreated;
  exchange: Exchange.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
