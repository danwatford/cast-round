import { Effect } from "effect";
import { subscribeToDomainEvents } from "../services/domain-events/subscriptions";

export const initVoting = () => {
  subscribeToDomainEvents("voting")(["UserRolesUpdatedDomainEvent"])((event) =>
    Effect.log(`voting callback: ${JSON.stringify(event)}`).pipe(
      Effect.andThen(Effect.succeed(event))
    )
  );
};
