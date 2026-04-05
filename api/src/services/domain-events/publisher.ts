import { Effect } from "effect";
import { SequelizeTransaction } from "../../persistence/db/SequelizeTransaction";
import { PublishedDomainEvent } from "../../persistence/db/models/DomainEvent";
import { getEventSubscribers } from "./subscriptions";
import { DomainEvent } from "./event";
import logger from "../../utils/logging";

export const publishDomainEvent = (event: DomainEvent) =>
  Effect.forEach(getEventSubscribers(event), (subscriber) =>
    SequelizeTransaction.pipe(
      Effect.tap(() =>
        Effect.sync(() =>
          logger.debug("Publishing domain event", {
            eventTag: event._tag,
            subscriberId: subscriber.subscriberId,
          })
        )
      ),
      Effect.andThen((transaction) =>
        Effect.tryPromise({
          try: () =>
            PublishedDomainEvent.create(
              {
                _tag: event._tag,
                subscriberId: subscriber.subscriberId,
                eventJson: JSON.stringify(event),
              },
              {
                transaction,
              }
            ),
          catch: (unknown) =>
            new Error(`Error calling PublishedDomainEvent.create`, {
              cause: unknown,
            }),
        })
      )
    )
  );
