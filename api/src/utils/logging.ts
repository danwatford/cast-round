import fs from "fs";
import path from "path";
import winston from "winston";
import env from "./env";

type LogFormat = "json" | "pretty";

const DEFAULT_LOG_LEVEL = env.NODE_ENV === "development" ? "debug" : "info";
const DEFAULT_LOG_FORMAT: LogFormat =
  env.NODE_ENV === "development" ? "pretty" : "json";

const resolvedLogLevel = env.LOG_LEVEL || DEFAULT_LOG_LEVEL;
const resolvedLogFormat: LogFormat =
  env.LOG_FORMAT === "json" || env.LOG_FORMAT === "pretty"
    ? env.LOG_FORMAT
    : DEFAULT_LOG_FORMAT;

const resolvedLogDirectory = env.LOG_DIR || "logs";
const resolvedMaxSize = env.LOG_MAX_SIZE > 0 ? env.LOG_MAX_SIZE : undefined;
const resolvedMaxFiles = env.LOG_MAX_FILES > 0 ? env.LOG_MAX_FILES : undefined;

fs.mkdirSync(path.resolve(resolvedLogDirectory), { recursive: true });

const serializeUnknownError = (value: unknown) => {
  if (!(value instanceof Error)) {
    return value;
  }

  return {
    name: value.name,
    message: value.message,
    stack: value.stack,
    cause: value.cause,
  };
};

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.message,
      stack: info.stack,
      name: info.name,
      cause: info.cause,
    });
  }

  if ("error" in info) {
    info.error = serializeUnknownError(info.error);
  }

  if ("cause" in info) {
    info.cause = serializeUnknownError(info.cause);
  }

  return info;
});

const prettyPrintFormat = winston.format.printf(
  ({ timestamp, level, message, ...metadata }) => {
    const metadataSuffix =
      Object.keys(metadata).length > 0 ? ` ${JSON.stringify(metadata)}` : "";
    return `${timestamp} ${level}: ${message}${metadataSuffix}`;
  }
);

const buildFormat = (formatName: LogFormat) =>
  formatName === "json"
    ? winston.format.combine(
        enumerateErrorFormat(),
        winston.format.timestamp(),
        winston.format.json()
      )
    : winston.format.combine(
        enumerateErrorFormat(),
        winston.format.timestamp(),
        winston.format.splat(),
        prettyPrintFormat
      );

const buildFileTransport = (filename: string, level?: string) =>
  new winston.transports.File({
    dirname: resolvedLogDirectory,
    filename,
    level,
    maxsize: resolvedMaxSize,
    maxFiles: resolvedMaxFiles,
  });

const logger = winston.createLogger({
  level: resolvedLogLevel,
  format: buildFormat(resolvedLogFormat),
  defaultMeta: {
    service: "cast-round-api",
    env: env.NODE_ENV,
  },
  transports: [
    buildFileTransport("error.log", "error"),
    buildFileTransport("combined.log"),
    new winston.transports.Console({
      format: buildFormat(resolvedLogFormat),
    }),
  ],
  exceptionHandlers: [buildFileTransport("exceptions.log")],
  rejectionHandlers: [buildFileTransport("rejections.log")],
});

logger.exitOnError = false;

export default logger;
