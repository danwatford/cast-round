# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Project Snapshot

- Project: **Cast Round** web application.
- Structure:
  - `api/`: Node + Express + TypeScript backend (Sequelize + Umzug migrations).
  - `front-end/`: React + Vite + TypeScript frontend (Tailwind + DaisyUI).
  - `.github/workflows/`: cPanel deployment pipelines for TEST and PROD.
  - `.devcontainer/`: local development container definition.
  - `tools/`: helper scripts for SSH keys and local workflow testing with `act`.

## Runtime and Tooling Requirements

- Node.js: **20.x** (policy is `>=20 <21` in package manifests).
- npm is the package manager.
- Root `package.json` is for repo-level tooling only; app runtime dependencies live in `api/` and `front-end/`.

## Local Development

1. Backend
   - `cd api`
   - `npm ci`
   - `npm run dev` (uses `api/.env.dev`)
2. Frontend
   - `cd front-end`
   - `npm ci`
   - `npm run dev`
   - Vite proxies `/api` to `http://localhost:5000` (see `front-end/vite.config.ts`).

## Build, Lint, and Test Commands

- Backend (`api/`)
  - Build: `npm run build`
  - Lint: `npm run lint` (runs ESLint with `--fix`)
  - DB migrate (dev env): `npm run devDbMigrate`
  - DB migrate (compiled/prod style): `npm run dbMigrate`
- Frontend (`front-end/`)
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Typecheck: `npm run typecheck`
  - Tests: `npm run test` (Vitest), `npm run test:ui`

When changing shared behaviors (auth, API contracts, DB persistence, routing), prefer running both backend and frontend build checks.

## Deployment Notes

- Workflows:
  - `cpanel-deploy-TEST.yml` (push to `main` or manual dispatch).
  - `cpanel-deploy-PROD.yml` (push tag `prod` or manual dispatch).
- Pipelines build API and frontend in GitHub Actions using Node 20.
- Hosted app creation is done through `cloudlinux-selector` with Node version `20`.
- Both TEST and PROD workflows now run an explicit stale-process cleanup step before destroying/replacing the app:
  - Attempts `cloudlinux-selector stop` (non-fatal if app is absent).
  - Uses `pgrep/pkill` against `HOSTING_APP_INSTALL_DIRECTORY` to terminate lingering app processes.
  - Fails deployment if any matching process remains after cleanup.
- TEST workflow runs DB migrations (`dbMigrate`) during deploy; PROD currently installs modules and starts app without a migration step.
- `cloudlinux-selector --app-root` values in this repo are relative app-root paths (for example `apps/crtest`), not absolute `/home/...` paths.

## Environment and Secrets

- `tools/.env.template` documents variables needed for cPanel helper scripts.
- `api/.env.dev` provides local backend defaults for development.
- Never commit real credentials, private keys, or populated secret files.
- Be careful with:
  - `tools/.env`
  - `tools/keys/*`
  - SSH key material and generated single-line key files

## Codebase Conventions

- Language: TypeScript in both backend and frontend.
- Backend style: Airbnb + TypeScript ESLint config (`api/.eslintrc`).
- Frontend style: React + TypeScript + Tailwind ESLint rules (`front-end/.eslintrc`).
- Keep changes focused and minimal; avoid broad refactors unless explicitly requested.
- Preserve existing behavior around authentication and persistence unless task scope includes behavioral changes.

## Agent Working Agreement

- Before editing, locate the real source of truth (script/config/type) instead of guessing.
- After edits, run the narrowest meaningful validation commands first, then broader checks if needed.
- If deployment-related files are changed, verify both TEST and PROD workflows remain aligned unless the task explicitly requires divergence.
- Do not revert unrelated local changes in a dirty working tree.
- Prefer small, reviewable diffs with clear intent.
