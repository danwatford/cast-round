import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

const REQUEST_ID_HEADER_LOWER = "x-request-id";
const REQUEST_ID_HEADER_CANONICAL = "X-Request-Id";
const MAX_REQUEST_ID_LENGTH = 128;

const sanitizeRequestId = (requestId: string) =>
  requestId.trim().slice(0, MAX_REQUEST_ID_LENGTH);

const isValidRequestId = (requestId: string) =>
  /^[A-Za-z0-9._-]+$/.test(requestId);

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingRequestId = req.header(REQUEST_ID_HEADER_LOWER);
  const sanitizedRequestId = incomingRequestId
    ? sanitizeRequestId(incomingRequestId)
    : "";

  const requestId =
    sanitizedRequestId.length > 0 && isValidRequestId(sanitizedRequestId)
      ? sanitizedRequestId
      : randomUUID();

  req.requestId = requestId;
  res.setHeader(REQUEST_ID_HEADER_CANONICAL, requestId);
  next();
};
