import { Publisher, Subjects, TicketUpdatedEvent } from '@mtbtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated
}