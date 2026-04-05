import { Effect } from "effect";
import { subscribeToDomainEvents } from "../services/domain-events/subscriptions";
import logger from "../utils/logging";

export const initUsersAndRoles = () => {
  subscribeToDomainEvents("users-and-roles")(["RolesRegisteredDomainEvent"])(
    (event) =>
      Effect.sync(() =>
        logger.debug("users-and-roles callback", {
          eventTag: event._tag,
        })
      ).pipe(
        Effect.andThen(Effect.succeed(event))
      )
  );

  subscribeToDomainEvents("users-and-roles2")(["RolesRegisteredDomainEvent"])(
    (event) =>
      Effect.sync(() =>
        logger.debug("users-and-roles2 callback", {
          eventTag: event._tag,
        })
      ).pipe(
        Effect.andThen(Effect.succeed(event))
      )
  );
};
