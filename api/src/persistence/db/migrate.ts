import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import env from "../../utils/env";
import migrations from "./migrations";
import logger from "../../utils/logging";

const sequelize = new Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    logging: false,
  }
);

export const umzug = new Umzug({
  migrations,
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: {
    info: (message) => logger.info("Migration info", { message }),
    warn: (message) => logger.warn("Migration warning", { message }),
    error: (message) => logger.error("Migration error", { message }),
    debug: (message) => logger.debug("Migration debug", { message }),
  },
});

umzug.runAsCLI();
