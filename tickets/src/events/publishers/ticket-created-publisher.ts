import { Publisher, Subjects, TicketCreatedEvent } from '@mtbtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated
}