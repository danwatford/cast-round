import axios from "axios";
import { Effect, Schema } from "effect";
import logger from "../utils/logging";

const DekWithLabel = Schema.Struct({
  deck_id: Schema.String,
  label: Schema.String,
});

const MembershipWorksUserInfoResponse = Schema.Struct({
  accountId: Schema.propertySignature(Schema.String).pipe(
    Schema.fromKey("account_id")
  ),
  accountName: Schema.propertySignature(Schema.String).pipe(
    Schema.fromKey("name")
  ),
  contactName: Schema.propertySignature(Schema.String).pipe(
    Schema.fromKey("contact_name")
  ),
  membership: Schema.Array(DekWithLabel),
  label: Schema.optional(Schema.Array(DekWithLabel)),
});

const MembershipWorksUserInfo = Schema.Struct({
  accountId: Schema.String,
  accountName: Schema.String,
  contactName: Schema.String,
  membershipAndLabels: Schema.Array(Schema.String),
});

type MembershipWorksUserInfoResponse =
  typeof MembershipWorksUserInfoResponse.Type;
type MembershipWorksUserInfo = typeof MembershipWorksUserInfo.Type;

const retrieveMwUserInfo = (accessToken: string) =>
  Effect.tryPromise({
    try: () =>
      axios.get<MembershipWorksUserInfoResponse>(
        "https://api.membershipworks.com/v2/oauth2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    catch: (unknown) =>
      new Error(`Error in HTTP get to MW API`, {
        cause: unknown,
      }),
  }).pipe(Effect.andThen((response) => response.data));

const summariseMwUserInfoResponseShape = (value: unknown) => {
  const objectValue = typeof value === "object" && value !== null ? value : null;
  const membershipValue = objectValue
    ? (objectValue as { membership?: unknown }).membership
    : undefined;
  const labelValue = objectValue
    ? (objectValue as { label?: unknown }).label
    : undefined;

  return {
    hasMembershipField: objectValue ? "membership" in objectValue : false,
    membershipIsArray: Array.isArray(membershipValue),
    membershipCount: Array.isArray(membershipValue) ? membershipValue.length : null,
    hasLabelField: objectValue ? "label" in objectValue : false,
    labelIsArray: Array.isArray(labelValue),
    labelCount: Array.isArray(labelValue) ? labelValue.length : null,
  };
};

const mwUserResponseToMwUser = (
  mwUserInfo: MembershipWorksUserInfoResponse
): MembershipWorksUserInfo => ({
  accountId: mwUserInfo.accountId,
  accountName: mwUserInfo.accountName,
  contactName: mwUserInfo.contactName,
  membershipAndLabels: [
    ...mwUserInfo.membership.map((x) => x.label),
    ...(mwUserInfo.label?.map((x) => x.label) ?? []),
  ],
});

export const getMwUserProfileForToken = (accessToken: string) =>
  retrieveMwUserInfo(accessToken).pipe(
    Effect.tap((rawResponse) =>
      Effect.sync(() =>
        logger.debug("MW userinfo response shape", {
          ...summariseMwUserInfoResponseShape(rawResponse),
        })
      )
    ),
    Effect.andThen((rawResponse) =>
      Effect.try({
        try: () => Schema.decodeUnknownSync(MembershipWorksUserInfoResponse)(rawResponse),
        catch: (unknown) =>
          new Error("Failed to decode MembershipWorks userinfo response", {
            cause: unknown,
          }),
      }).pipe(
        Effect.tapError((error) =>
          Effect.sync(() =>
            logger.warn("MW userinfo decode failed", {
              ...summariseMwUserInfoResponseShape(rawResponse),
              error,
            })
          )
        )
      )
    ),
    Effect.andThen((decodedUserInfo) => mwUserResponseToMwUser(decodedUserInfo)),
    Effect.tap((profile) =>
      Effect.sync(() =>
        logger.info("MW user profile prepared", {
          accountId: profile.accountId,
          membershipAndLabelsCount: profile.membershipAndLabels.length,
        })
      )
    ),
    Effect.tap((profile) =>
      profile.membershipAndLabels.length === 0
        ? Effect.sync(() =>
            logger.warn("MW user has no membership/label entries", {
              accountId: profile.accountId,
            })
          )
        : Effect.void
    )
  );
