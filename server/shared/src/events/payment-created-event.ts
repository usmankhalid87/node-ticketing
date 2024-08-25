import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface PaymentCreatedEvent {
  routingKey: RoutingKeys.PaymentCreated;
  exchange: Exchange.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
