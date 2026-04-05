import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";

import { Response } from "express";

import logger from "../../utils/logging";

export type StandardJsonResponseHandleableError =
  | Error
  | "bad-request"
  | "forbidden"
  | "not-found";

export const standardJsonResponseFold = <A>(res: Response<A>) =>
  TE.fold<StandardJsonResponseHandleableError, A, undefined>(
    (err) => {
      if (err === "bad-request") {
        res.sendStatus(400);
      } else if (err === "forbidden") {
        res.sendStatus(403);
      } else if (err === "not-found") {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
        logger.error("Request failed in standardJsonResponseFold", {
          requestId: res.req.requestId,
          method: res.req.method,
          path: res.req.originalUrl,
          statusCode: 500,
          error: err,
        });
        (res.locals as { errorLogged?: boolean }).errorLogged = true;
      }
      return T.of(undefined);
    },
    (results: A) => {
      res.json(results);
      return T.of(undefined);
    }
  );
