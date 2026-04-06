## Why

Contributors can discover database details, but there is no single canonical document that explains the full Cast Round technology stack across frontend, backend, infrastructure, and deployment. Creating that source of truth now reduces onboarding time and keeps implementation and operations decisions aligned as the project evolves.

The document should also explain what technologies we are introducing, such as the ongoing move to Effect for Typescript for the backend.

## What Changes

- Add a canonical in-repository technology stack document that describes major runtime and build technologies used by Cast Round.
- Define required content coverage for backend, frontend, database, infrastructure/deployment, and local development tooling.
- Define synchronization expectations so technology changes are reflected in the canonical tech-stack document in the same change set.
- Link the tech-stack documentation to authoritative source locations in the repository for verification.

## Capabilities

### New Capabilities
- `techstack-documentation`: Canonical documentation requirements for the complete project technology stack and its environment-specific usage.

### Modified Capabilities
- None.

## Impact

- Documentation in `docs/` (new canonical tech-stack file, plus references from contributor-facing docs as needed).
- OpenSpec artifacts under `openspec/changes/create-techstack-documentation/` and `openspec/specs/techstack-documentation/`.
- Contributor workflow clarity for onboarding and for keeping architecture documentation synchronized with code/config changes.
