import { RoutingKeys } from "./routing-keys";

export interface TicketCreatedEvent {
  subject: RoutingKeys.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
