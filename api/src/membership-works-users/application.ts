import { Effect } from "effect";
import { getMwUserProfileForToken } from "./fetchMwUserInfo";
import {
  createAccount,
  getAccountById,
  updateAccount,
} from "./domain/accounts-repo";
import { MembershipWorksUserInfo } from "./domain/types";
import { createUserService, getUserService } from "../UsersAndRoles/services";
import { MwAccount } from "../persistence/db/models/MwAccount";
import logger from "../utils/logging";

const createMwUser = (mwUserProfile: MembershipWorksUserInfo) =>
  createUserService(
    "mwAccount",
    mwUserProfile.accountName,
    "membership-works-users",
    mwUserProfile.membershipAndLabels
  ).pipe(Effect.tap((user) => createAccount(mwUserProfile)(user.userId)));

const createUserAndUpdateMwAccount = (mwAccount: MwAccount) =>
  createUserService(
    "mwAccount",
    mwAccount.accountName,
    "membership-works-users",
    mwAccount.membershipAndLabels
  ).pipe(Effect.tap((user) => updateAccount(mwAccount)(user.userId)));

export const loginMwUser = (accessToken: string) =>
  getMwUserProfileForToken(accessToken).pipe(
    Effect.tap((mwProfile) =>
      Effect.sync(() =>
        logger.info("MW login profile retrieved", {
          accountId: mwProfile.accountId,
          membershipAndLabelsCount: mwProfile.membershipAndLabels.length,
        })
      )
    ),
    Effect.andThen((mwProfile) =>
      getAccountById(mwProfile.accountId).pipe(
        Effect.tap((account) =>
          Effect.sync(() =>
            logger.info("MW account found", {
              accountId: mwProfile.accountId,
              userId: account.userId,
            })
          )
        ),
        Effect.andThen((account) =>
          getUserService(account.userId).pipe(
            Effect.tap((user) =>
              Effect.sync(() =>
                logger.info("Existing user found for MW account", {
                  accountId: mwProfile.accountId,
                  userId: user.userId,
                })
              )
            ),
            // If we have a User ID, but the user cannot be found, then we have a data consistency issue.
            // Create the new user and fix up the MW Account record.
            Effect.catchTag("NoSuchElementException", () =>
              Effect.sync(() =>
                logger.warn("MW account points to missing user; recreating user", {
                  accountId: mwProfile.accountId,
                  missingUserId: account.userId,
                })
              ).pipe(Effect.andThen(createUserAndUpdateMwAccount(account)))
            )
          )
        ),
        Effect.catchTag("NoSuchElementException", () =>
          Effect.sync(() =>
            logger.info("No existing MW account found; creating new user/account", {
              accountId: mwProfile.accountId,
            })
          ).pipe(Effect.andThen(createMwUser(mwProfile)))
        )
      )
    ),
    Effect.tapError((error) =>
      Effect.sync(() =>
        logger.error("MW login flow failed during account/user persistence", {
          error,
        })
      )
    )
  );
