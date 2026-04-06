## Why

The repository uses multiple database-related technologies across local development, runtime persistence, and migrations, but this knowledge is spread across code and onboarding notes. A dedicated, versioned spec is needed now to make stack decisions explicit, reduce onboarding friction, and prevent environment drift.

## What Changes

- Add a new capability that defines what database technologies are used by Cast Round and where each is used.
- Document required database technology choices for runtime persistence, migrations, local infrastructure, and session storage.
- Define requirements for keeping database technology documentation aligned with code and deployment workflows.
- Establish acceptance criteria for a canonical in-repo document that developers can rely on during setup, debugging, and change planning.

## Capabilities

### New Capabilities
- `database-technology-documentation`: Defines required, source-of-truth documentation for database engine, ORM, migration framework, and environment-specific usage in Cast Round.

### Modified Capabilities
- None.

## Impact

Affected systems include backend persistence and migration code in `api/src/persistence/db`, local infrastructure configuration in `infra/localdev/docker-compose.yml`, and developer-facing operational guidance in repository docs. No runtime API behavior changes are introduced by this change.
