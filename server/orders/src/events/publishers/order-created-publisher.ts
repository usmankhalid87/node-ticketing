import {
  Publisher,
  OrderCreatedEvent,
  RoutingKeys,
  Exchange,
} from "@usmankhalid87/ticketing-shared";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  routingKey: RoutingKeys.OrderCreated = RoutingKeys.OrderCreated;
  exchangeName: Exchange.OrderCreated = Exchange.OrderCreated;
}
