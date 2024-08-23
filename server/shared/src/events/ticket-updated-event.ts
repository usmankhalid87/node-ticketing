import { RoutingKeys } from "./routing-keys";

export interface TicketUpdatedEvent {
  subject: RoutingKeys.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
