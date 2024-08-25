import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface ExpirationCompleteEvent {
  routingKey: RoutingKeys.ExpirationComplete;
  exchange: Exchange.ExpirationComplete;
  data: {
    orderId: string;
  };
}
