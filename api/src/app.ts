import express, { Request } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import api from "./api";

import env from "./utils/env";
import logger from "./utils/logging";
import { sessionRequestHandler } from "./authentication/session";
import { authenticationRequestHandlers } from "./authentication/appAuthentication";
import { requestIdMiddleware } from "./middlewares/requestId";

require("dotenv").config();

const app = express();

if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

const parseMorganMessage = (message: string) => {
  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return null;
  }

  try {
    return JSON.parse(trimmedMessage) as Record<string, unknown>;
  } catch {
    return { rawMessage: trimmedMessage };
  }
};

const getRequestIdForMorgan = (req: Parameters<morgan.FormatFn>[1]) =>
  ((req as Request).requestId || req.headers["x-request-id"] || "").toString();

const morganStructuredFormatter: morgan.FormatFn = (tokens, req, res) =>
  JSON.stringify({
    requestId: getRequestIdForMorgan(req),
    method: tokens.method(req, res),
    path: tokens.url(req, res),
    statusCode: Number(tokens.status(req, res) || 0),
    responseTimeMs: Number(tokens["response-time"](req, res) || 0),
    responseSize: tokens.res(req, res, "content-length") || null,
    remoteAddress: tokens["remote-addr"](req, res),
    userAgent: tokens.req(req, res, "user-agent"),
  });

const morganSuccessHandler = morgan(morganStructuredFormatter, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: {
    write: (message) => {
      const httpRequestMetadata = parseMorganMessage(message);
      if (!httpRequestMetadata) {
        return;
      }
      logger.info("HTTP request completed", httpRequestMetadata);
    },
  },
});

const morganErrorHandler = morgan(morganStructuredFormatter, {
  skip: (_req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      const httpRequestMetadata = parseMorganMessage(message);
      if (!httpRequestMetadata) {
        return;
      }
      logger.error("HTTP request failed", httpRequestMetadata);
    },
  },
});

app.use(requestIdMiddleware);
app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(sessionRequestHandler);
app.use(authenticationRequestHandlers);

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
