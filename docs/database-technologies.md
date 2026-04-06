# Database Technologies

This document is the canonical reference for Cast Round database technologies.
When database engine, ORM, migration framework, session persistence behavior, or DB-related workflow behavior changes, update this file in the same change.

## Relational Database Engine

- Runtime DB connectivity uses MySQL protocol settings via environment variables and Sequelize's `mysql` dialect.
- Local development database service runs MariaDB (`mariadb:10.11`) via Docker Compose.
- Local phpMyAdmin connects to the same local DB service for inspection and troubleshooting.

Primary source files:
- `infra/localdev/docker-compose.yml`
- `api/src/persistence/db/models/index.ts`
- `api/src/persistence/db/migrate.ts`
- `api/.env.dev`

## ORM and DB Driver

- The backend ORM is Sequelize (`sequelize` package).
- The SQL driver used by Sequelize is `mysql2`.
- Domain persistence models are initialized in the DB model bootstrap module.

Primary source files:
- `api/package.json`
- `api/src/persistence/db/models/index.ts`

## Migration Framework and Entry Points

- Schema migrations are managed by Umzug with Sequelize-backed migration storage.
- Local development migration command:
  - `cd api && npm run devDbMigrate`
- Compiled/prod-style migration command:
  - `cd api && npm run dbMigrate`
- The migration CLI entry point is `api/src/persistence/db/migrate.ts`.

Primary source files:
- `api/package.json`
- `api/src/persistence/db/migrate.ts`
- `api/src/persistence/db/migrations/`

## Session Persistence

- Express sessions are persisted using `connect-session-sequelize`.
- Session storage uses the shared Sequelize connection (`sequelize`) and synchronizes a session table via `sequelizeStore.sync()`.

Primary source files:
- `api/src/authentication/session.ts`
- `api/src/persistence/db/models/index.ts`
- `api/package.json`

## Environment-Specific Usage

### Local Development

- The DB stack for local development is defined in `infra/localdev/docker-compose.yml`.
- API local DB settings are provided by `api/.env.dev` and any local overrides in `api/.env.dev.local`.
- Typical local sequence:
  - Start DB services with Docker Compose.
  - Run `cd api && npm run devDbMigrate`.
  - Start backend and frontend dev servers.

Primary source files:
- `infra/localdev/docker-compose.yml`
- `AGENTS.md`
- `README.md`
- `api/package.json`

### Deployment Workflows

- TEST workflow runs migrations during deploy by invoking `dbMigrate` before app start.
- PROD workflow currently installs modules and starts the app without a migration step.
- Both workflows provide DB connection values through environment variables and write them into the deployed API `.env`.

Primary source files:
- `.github/workflows/cpanel-deploy-TEST.yml`
- `.github/workflows/cpanel-deploy-PROD.yml`

## Change Synchronization Rule

Any change that modifies one of the following MUST update this document in the same change set:
- Database engine/runtime connectivity assumptions.
- ORM, DB driver, or migration framework.
- Migration commands or migration workflow behavior.
- Session persistence implementation over the DB stack.
- Environment-specific DB operational behavior in local/deploy workflows.
