import { RoutingKeys } from "./routing-keys";

export interface OrderCancelledEvent {
  subject: RoutingKeys.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
