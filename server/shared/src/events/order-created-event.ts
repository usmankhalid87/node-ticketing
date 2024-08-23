import { RoutingKeys } from "./routing-keys";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  subject: RoutingKeys.OrderCreated;
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
