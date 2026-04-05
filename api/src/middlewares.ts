import { NextFunction, Request, Response } from "express";
import ErrorResponse from "./api/interfaces/ErrorResponse";
import logger from "./utils/logging";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  const responseLocals = res.locals as { errorLogged?: boolean };
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  if (!responseLocals.errorLogged) {
    logger.error("Unhandled request error", {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode,
      error: err,
    });
    responseLocals.errorLogged = true;
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
