import { RoutingKeys } from "./routing-keys";

export interface PaymentCreatedEvent {
  subject: RoutingKeys.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
