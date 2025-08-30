import { DataTypes, QueryInterface } from "sequelize";
import { RunnableMigration } from "umzug";

export default {
  name: "20250511201900-alter-ur-users",
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("urUsers", "roles", {
      type: DataTypes.TEXT,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("urUsers", "roles", {
      type: DataTypes.STRING,
    });
  },
} as RunnableMigration<QueryInterface>;
