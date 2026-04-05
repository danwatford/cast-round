import { cleanEnv, port, str, url, bool, num } from "envalid";
import { config } from "dotenv";

config();

const validateEnv = () =>
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MYSQL_HOST: str(),
    MYSQL_PORT: port(),
    MYSQL_DATABASE: str(),
    MYSQL_USER: str(),
    MYSQL_PASSWORD: str(),

    MW_OAUTH2_CLIENT_ID: str(),
    MW_OAUTH2_CLIENT_SECRET: str(),
    MW_OAUTH2_CALLBACK_URL: url(),

    SESSION_SECRET: str(),

    ADMIN_MW_LABEL_ID: str(),

    FEATURE_UI_EVENT_GROUP_DELEGATES: bool({
      default: false,
      desc: "Enable use of event group delegates in the frontend.",
    }),
    FEATURE_UI_EVENT_TELLORS: bool({
      default: false,
      desc: "Enable use of event tellors in the frontend.",
    }),

    LOG_LEVEL: str({
      default: "",
      desc: "Optional log level override (for example: error, warn, info, debug).",
    }),
    LOG_FORMAT: str({
      default: "",
      desc: "Optional log format override (json or pretty).",
    }),
    LOG_DIR: str({
      default: "logs",
      desc: "Directory for file-based logs.",
    }),
    LOG_MAX_SIZE: num({
      default: 5242880,
      desc: "Max log file size in bytes before rotation.",
    }),
    LOG_MAX_FILES: num({
      default: 5,
      desc: "Number of rotated log files to retain.",
    }),
  });

export default validateEnv();
