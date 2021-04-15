import { Subjects, Publisher, ExpirationCompleteEvent } from '@mtbtickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete
}