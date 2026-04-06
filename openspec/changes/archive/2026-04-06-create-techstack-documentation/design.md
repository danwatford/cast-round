## Context

Cast Round currently has a canonical document for database technologies (`docs/database-technologies.md`) and onboarding/development guidance spread across `README.md` and `AGENTS.md`. There is no single canonical artifact that summarizes the broader stack (frontend, backend, database, infrastructure, deployment workflows, and core tooling) with traceable references to source-of-truth files.

The proposed change adds a project-level tech-stack document and keeps it complementary to the existing database-focused document rather than replacing it. This minimizes risk to existing contributor expectations while improving discoverability.

## Goals / Non-Goals

**Goals:**
- Introduce a canonical technology stack document under `docs/` that covers major platform areas:
  - Frontend technologies
  - Backend technologies
  - Database stack (high-level, with references to detailed DB doc)
  - Infrastructure and deployment tooling
  - Local development/runtime prerequisites
- Ensure the document captures both currently adopted technologies and explicitly in-progress technology adoptions (for example, ongoing backend migration toward Effect for TypeScript), including clear status labeling.
- Ensure every documented claim points to authoritative repository sources so the document is auditable.
- Establish a synchronization rule so stack-affecting changes update the document in the same change set.

**Non-Goals:**
- Replacing or removing `docs/database-technologies.md`.
- Creating an exhaustive dependency inventory of every npm package.
- Changing runtime behavior, deployment logic, or database architecture as part of this change.

## Decisions

### Decision 1: Add a new canonical tech-stack document instead of expanding `README.md`
- Choice: Create a dedicated document in `docs/` (for example `docs/techstack.md`) and link it from existing contributor docs.
- Rationale: `README.md` is optimized for setup and quickstart, while the tech-stack reference benefits from stable structure and update rules.
- Alternatives considered:
  - Expand `README.md` with stack details: rejected because it mixes onboarding flow with architectural reference material.
  - Keep documentation distributed across files only: rejected because discoverability and consistency remain weak.

### Decision 2: Keep database detail in the existing DB document and summarize it in the new tech-stack doc
- Choice: Include database technologies at a summary level in the new tech-stack document and point readers to `docs/database-technologies.md` for full operational detail.
- Rationale: Avoids duplicating deep DB operational content while ensuring a complete top-level stack picture.
- Alternatives considered:
  - Duplicate all DB detail in the new file: rejected due to high drift risk.
  - Omit DB from the new file: rejected because the result would not be a complete stack overview.

### Decision 3: Define section-level source references
- Choice: Each major section includes explicit "Primary source files" references to code/config/workflow files.
- Rationale: Makes documentation verifiable and easier to maintain when stack details change.
- Alternatives considered:
  - Narrative-only documentation: rejected because it is harder to validate and update accurately.

### Decision 4: Include technology adoption status in the canonical doc
- Choice: When technologies are being introduced incrementally, document them with explicit status labels (for example, `current`, `adopting`, `planned`) and scope notes.
- Rationale: Prevents ambiguity during migrations such as backend adoption of Effect and helps contributors understand mixed-state architecture.
- Alternatives considered:
  - Document only fully adopted technologies: rejected because it hides active migration context.
  - Track migration status outside the canonical document: rejected because context becomes fragmented.

## Risks / Trade-offs

- [Risk] The new document can drift from implementation over time. -> Mitigation: Add an explicit synchronization rule and reference checks in contributor guidance.
- [Risk] Overlap with existing docs can create ambiguity. -> Mitigation: Define scope boundaries (tech-stack overview vs. deep DB operations).
- [Risk] In-progress technology notes can become stale quickly. -> Mitigation: Require status labels and source references for migration state, and update in the same change as migration milestones.
- [Trade-off] More docs mean additional maintenance overhead. -> Mitigation: Keep the document concise and structured around high-signal stack categories.

## Migration Plan

1. Add the canonical tech-stack document in `docs/`.
2. Link the document from contributor-facing docs (`README.md` and/or `AGENTS.md`) where appropriate.
3. Confirm stack statements match current source files and workflows.
4. No runtime migration or rollback is required because this is documentation-only.

## Open Questions

- Should the canonical filename be `docs/techstack.md` or `docs/technology-stack.md` to best match current repository naming conventions?
