import { RoutingKeys } from "./routing-keys";

export interface ExpirationCompleteEvent {
  subject: RoutingKeys.ExpirationComplete;
  data: {
    orderId: string;
  };
}
