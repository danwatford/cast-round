import { DataTypes, QueryInterface } from "sequelize";
import { RunnableMigration } from "umzug";

export default {
  name: "20250511203000-alter-svc-domain-events",
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("svcPublishedDomainEvents", "eventJson", {
      type: DataTypes.TEXT,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("svcPublishedDomainEvents", "eventJson", {
      type: DataTypes.STRING,
    });
  },
} as RunnableMigration<QueryInterface>;
