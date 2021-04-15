import { Publisher, OrderCancelledEvent, Subjects } from '@mtbtickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled
}