# Technology Stack

This document is the canonical reference for Cast Round technology stack coverage across frontend, backend, database, infrastructure/deployment, and local development.

Status labels used in this document:
- `current`: actively used in production-relevant flows today.
- `adopting`: being introduced incrementally alongside legacy approaches.
- `planned`: intended but not yet present in repository code/config.

## Frontend Stack

- `current`: React 18 + React DOM for client rendering.
- `current`: Vite for development/build tooling.
- `current`: TypeScript for frontend source and type-checking.
- `current`: Tailwind CSS + DaisyUI for styling.
- `current`: React Router for client routing.
- `current`: Vitest for frontend test execution.

Primary source files:
- `front-end/package.json`
- `front-end/src/index.tsx`
- `front-end/vite.config.ts`
- `front-end/tailwind.config.js`
- `front-end/tsconfig.json`

## Backend Stack

- `current`: Node.js 20.x runtime policy.
- `current`: Express API server with middleware for auth/security/logging/session handling.
- `current`: TypeScript backend source compiled with `tsc`.
- `adopting`: Effect for TypeScript is actively used in selected backend modules (startup orchestration, domain events, selected service/domain layers, and transaction abstractions) while other backend flows continue to use established async/Express patterns.

Primary source files:
- `api/package.json`
- `api/src/index.ts`
- `api/src/app.ts`
- `api/src/services/domain-events/backend.ts`
- `api/src/persistence/db/transaction.ts`
- `api/src/UsersAndRoles/services.ts`
- `api/src/membership-works-users/application.ts`

## Database and Persistence Stack

- `current`: MySQL-compatible runtime connectivity through Sequelize's `mysql` dialect.
- `current`: Sequelize ORM with `mysql2` SQL driver.
- `current`: Umzug-backed schema migrations.
- `current`: DB-backed session persistence using `connect-session-sequelize`.
- Detailed DB operational behavior is maintained in `docs/database-technologies.md`.

Primary source files:
- `docs/database-technologies.md`
- `api/package.json`
- `api/src/persistence/db/models/index.ts`
- `api/src/persistence/db/migrate.ts`
- `api/src/authentication/session.ts`

## Infrastructure and Deployment

- `current`: GitHub Actions workflows for TEST/PROD build-and-deploy pipelines.
- `current`: cPanel/CloudLinux Node app lifecycle management via `cloudlinux-selector`.
- `current`: Workflow-level environment/secret injection for API runtime configuration.
- `current`: TEST deploy runs database migrations; PROD deploy currently starts without migration execution.

Primary source files:
- `.github/workflows/cpanel-deploy-TEST.yml`
- `.github/workflows/cpanel-deploy-PROD.yml`

## Local Development Tooling and Runtime

- `current`: Docker Compose local infrastructure for MariaDB + phpMyAdmin.
- `current`: npm-based backend/frontend workflows with Node 20.x.
- `current`: Vite dev-server proxy from frontend API routes to the local backend.

Primary source files:
- `infra/localdev/docker-compose.yml`
- `README.md`
- `AGENTS.md`
- `api/package.json`
- `front-end/package.json`
- `front-end/vite.config.ts`

## Change Synchronization Rule

Any change that modifies core stack composition, technology status (`current`/`adopting`/`planned`), or environment-specific stack usage MUST update this document in the same change set.

Updates SHALL preserve section-level references to authoritative source files so contributors can verify documented behavior directly from repository code/configuration.
