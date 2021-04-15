import { Subjects, Publisher, PaymentCreatedEvent } from '@mtbtickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated
}