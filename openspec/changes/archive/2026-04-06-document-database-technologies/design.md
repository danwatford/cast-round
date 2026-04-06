## Context

Cast Round relies on a relational database stack that spans local infrastructure, backend runtime persistence, migration tooling, and deployment workflows. The current details exist across `AGENTS.md`, `api/package.json`, `api/src/persistence/db/*`, and `infra/localdev/docker-compose.yml`, but there is no single normative artifact that defines the expected technology stack and ownership boundaries.

This change introduces a spec-driven documentation capability so contributors can reliably answer: what database technologies are authoritative for this project, where they are configured, and what must be updated when stack choices change.

## Goals / Non-Goals

**Goals:**
- Define normative requirements for a canonical database technologies document.
- Require the document to cover runtime DB engine, ORM, migration framework, session persistence, and environment-specific usage.
- Ensure change management is explicit by requiring documentation updates when DB technologies change.
- Reduce onboarding/debugging ambiguity around DB-related setup and migration commands.

**Non-Goals:**
- Changing runtime database engine, ORM, or migration framework.
- Refactoring backend persistence code or migration implementation.
- Modifying deployment behavior for TEST/PROD.
- Introducing automated enforcement tooling in this change.

## Decisions

1. Maintain a dedicated capability spec (`database-technology-documentation`) instead of ad-hoc README notes.
- Rationale: OpenSpec requirements provide a stable contract and make future updates auditable via change history.
- Alternatives considered:
  - Keep information only in AGENTS or root docs. Rejected because those documents are descriptive and can drift without requirement-level constraints.

2. Scope documentation requirements to current source-of-truth files rather than inferred architecture diagrams.
- Rationale: Contributors can validate claims directly against code/config (`api/src/persistence/db`, `api/package.json`, `infra/localdev/docker-compose.yml`).
- Alternatives considered:
  - High-level architecture-only documentation. Rejected because it omits actionable implementation and operation details.

3. Require explicit coverage for environment distinctions (local dev and deploy workflow behavior).
- Rationale: Migration and operational differences across environments are a frequent source of confusion and regressions.
- Alternatives considered:
  - Treat environments as implicit. Rejected due to repeated troubleshooting cost and onboarding gaps.

## Risks / Trade-offs

- [Documentation drifts from implementation] -> Mitigation: add requirement that any DB technology change includes an update to the canonical document in the same change set.
- [Spec is too broad and hard to verify] -> Mitigation: keep requirements concrete and scenario-driven, focused on named technologies and source files.
- [Contributors interpret guidance as architecture change request] -> Mitigation: clearly state non-goals and preserve existing runtime behavior.

## Migration Plan

1. Add capability spec defining required database technology documentation behavior.
2. Implement tasks to create/update canonical project documentation file(s) according to the spec.
3. Validate documentation references against current code and infra files before marking complete.
4. No runtime migration or rollback is required because this change is documentation/spec focused.

## Open Questions

- What is the preferred long-term home for the canonical database technologies document (root docs vs backend-focused docs path)?
- Should a follow-up change add CI checks to ensure the canonical document is updated when DB dependency files change?
