import { Publisher, OrderCreatedEvent, Subjects } from '@mtbtickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated
}