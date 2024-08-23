import { Subjects, TicketCreatedEvent } from "@usmankhalid87/ticketing-shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
