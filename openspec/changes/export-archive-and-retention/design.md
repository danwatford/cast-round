## Context

Operational direction for Cast Round is short-lived active events with eventual removal after records are exported for long-term custody elsewhere. This requires a formal lifecycle and safe-guarded destructive operation flow.

Constraints:
- Export output must be complete enough for official record-keeping.
- Archived events must become read-only within Cast Round.
- Hard delete is allowed only after explicit committee action and must be auditable.

## Goals / Non-Goals

**Goals:**
- Define a deterministic export package contract for event data.
- Introduce explicit event lifecycle states and valid transitions.
- Enforce read-only behavior for archived events.
- Enforce authorized and confirmed deletion with audit trace.

**Non-Goals:**
- Designing external long-term storage systems.
- Building automated retention schedules in this phase.
- Recovering deleted events from within Cast Round storage.

## Decisions

1. Lifecycle is explicit and state-driven.
- Events transition from `active` to `archived`, and from `archived` to `deleted` via explicit authorized actions.
- Alternative considered: immediate delete on export. Rejected to reduce accidental data loss risk.

2. Archived means read-only for governance and voting records.
- No further event/motion/vote mutations are permitted in archived state.
- Alternative considered: partial edits allowed post-archive. Rejected to preserve exported-record consistency.

3. Export package is structured and completeness-checked.
- Export includes event metadata, motions, vote tallies, ballot records per access policy, and associated audit history.
- Alternative considered: CSV totals-only export. Rejected because investigation and governance records require richer data.

4. Deletion is safeguarded by confirmation and audit.
- Hard delete requires explicit committee authorization and confirmation payload; operation writes audit entry before and after completion markers.
- Alternative considered: single-click delete. Rejected due to irreversible risk.

## Risks / Trade-offs

- [Large export payloads for events with heavy audit history] -> Mitigation: streaming export generation and chunked download support.
- [Operator error during deletion] -> Mitigation: multi-step confirmation and clear archived-state prerequisite.
- [Policy mismatch on including individual ballots] -> Mitigation: align export fields with ballot visibility policy and role-gated export operations.
- [State drift between API and UI] -> Mitigation: server-authoritative state checks with UI disabling for archived/deleted actions.

## Migration Plan

1. Add event lifecycle state fields and transition validation logic.
2. Implement export generation endpoint with schema validation tests.
3. Implement archive action that locks event/motion/vote mutations.
4. Implement committee-only delete flow requiring archived precondition and explicit confirmation.
5. Add audit instrumentation for export, archive, and delete lifecycle operations.

## Open Questions

- Whether export formats should include both machine-readable JSON and human-readable CSV/PDF in this phase.
- Whether delete operations should support a short grace period before irreversible purge.
