import { Exchange } from "./exchange-names";
import { RoutingKeys } from "./routing-keys";

export interface Event {
  routingKey: RoutingKeys;
  exchange: Exchange;
  data: any;
}
