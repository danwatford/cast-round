## Context

The codebase already contains domain-event infrastructure and voting flows, but audit requirements are not yet defined as explicit product contracts. This change establishes governance-grade traceability and ballot visibility controls.

Constraints:
- Audit coverage must include every mutation affecting event governance and voting outcomes.
- Attribution must identify actor type and effective identity context (including delegated actions).
- Individual ballot visibility is restricted to authorized officials only.

## Goals / Non-Goals

**Goals:**
- Ensure all relevant event mutations produce immutable, queryable audit records.
- Normalize actor attribution across direct member actions and delegated/tellor/clerk pathways.
- Enforce strict access controls for per-voter ballots while preserving subtotal visibility.
- Define investigation-ready timeline retrieval semantics.

**Non-Goals:**
- Long-term external archival/export package definition (handled in a separate change).
- Replacing existing app logging for operational telemetry.
- Introducing public/member-facing individual ballot transparency.

## Decisions

1. Audit records are append-only and immutable.
- Mutating operations write a new audit entry with action, actor, target, and before/after summary.
- Alternative considered: mutable audit rows for correction. Rejected to avoid tampering ambiguity.

2. Actor identity model includes principal and acting context.
- Entries include actor user id, actor role context, and on-behalf-of identity when applicable.
- Alternative considered: actor id only. Rejected because delegated and assisted voting requires richer attribution.

3. Ballot visibility is role-gated server-side.
- Totals remain broadly visible per existing policy, while individual ballots require explicit official roles.
- Alternative considered: frontend-only hiding. Rejected because server enforcement is required.

4. Investigation queries are timeline-first.
- APIs prioritize chronological retrieval by event with filtering by motion, actor, action type, and affected voter context.
- Alternative considered: action-type silo endpoints only. Rejected because complaint handling needs full timeline reconstruction.

## Risks / Trade-offs

- [High audit volume during live sessions] -> Mitigation: indexed storage, pagination, and bounded query windows.
- [Sensitive data exposure in audit payloads] -> Mitigation: schema-level field allowlist and redaction rules for sensitive tokens.
- [Authorization drift across official roles] -> Mitigation: centralized policy matrix and regression tests per endpoint.
- [Complexity in before/after capture for nested vote payloads] -> Mitigation: normalized diff representation with deterministic serialization.

## Migration Plan

1. Define audit entry schema and indexes supporting event+time and actor-based queries.
2. Instrument all event-mutating handlers to emit canonical audit entries.
3. Add restricted ballot and audit retrieval endpoints guarded by official-role authorization.
4. Add investigation timeline API filters and UI integration points for authorized workflows.
5. Rollback plan: keep audit writes enabled but gate new query surfaces if performance issues emerge.

## Open Questions

- Whether voting clerks and tellors should share the same ballot-inspection privileges or be policy-distinct.
- Whether audit viewers need tamper-evident signatures in this phase or in a follow-up hardening phase.
