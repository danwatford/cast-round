## Context

Cast Round currently has frontend contracts for events, motions, vote definition schema, and motion vote totals, but backend implementation remains incomplete and normative behavior is not yet formalized in OpenSpec. This change establishes the core voting integrity foundation used by all later capabilities.

Key constraints:
- MembershipWorks-linked account/role state remains the source of truth at vote action time.
- Advanced (proxy) and live votes must remain separable in tally outputs.
- Existing `tellor` naming is preserved and out of scope for renaming.

## Goals / Non-Goals

**Goals:**
- Provide an explicit event/motion lifecycle model and valid status transitions.
- Define deterministic vote capture and counting semantics for written-ballot workflows, including split voting by role vote-weight.
- Establish strict behavior for amendment/substantive motion handling and vote supersede.
- Establish consistent eligibility checks based on live account role data.

**Non-Goals:**
- Implement delegated access lifecycle (covered in a separate change).
- Introduce show-of-hands voting mode (separate follow-up proposal).
- Add export/archive or audit query surfaces (separate changes).

## Decisions

1. Lifecycle control remains committee-mediated.
- Event visibility and motion state changes are committee-governed actions.
- Motion status transitions are validated server-side using an allow-list transition graph.
- Alternative considered: client-side enforcement only. Rejected because it is bypassable and weakens integrity.

2. Vote records are persisted as per-response allocations per voter context.
- A submission is modeled as a set of response allocations with total allocated votes constrained by role weight.
- Alternative considered: single response plus count only. Rejected because split voting must distribute across multiple responses.

3. Advanced and live buckets are first-class in counting.
- Totals APIs return subtotal rows keyed by response and bucket (`advanced=true|false`) and a deterministic combined total is derived for display.
- Alternative considered: one combined bucket with metadata tags. Rejected because chair discretion requires explicit separable subtotals.

4. MembershipWorks-linked account role state is resolved at action time.
- Eligibility, role mapping, and permitted vote weight are checked when submitting/changing/withdrawing votes.
- Alternative considered: event-open snapshot model. Rejected by product direction for this phase.

5. Amendment/substantive handling uses supersede semantics.
- When a motion is amended into substantive form, prior submissions remain recorded for traceability but are marked non-current for outcome counting until explicitly re-applied by authorized flow.
- Alternative considered: delete prior submissions. Rejected because it impairs traceability and complaint investigation.

## Risks / Trade-offs

- [Live MembershipWorks lookup latency/outage] -> Mitigation: cache short-lived role lookups with strict TTL and fail-safe error responses that prevent invalid vote acceptance.
- [Role mapping drift between MembershipWorks account types and voting roles] -> Mitigation: centralize mapping logic and enforce contract tests for all known account type permutations.
- [Complexity in amendment supersede behavior] -> Mitigation: explicit state fields and deterministic rules in specs with scenario tests per transition.
- [Subtotal inconsistencies across UI and API] -> Mitigation: shared response DTO shape and end-to-end tests that validate bucketed and combined totals.

## Migration Plan

1. Introduce/confirm persistence schema support for motion status transition validation and vote submission bucket markers.
2. Implement server-side lifecycle and vote counting rules behind existing API paths with compatibility-preserving DTO extension where needed.
3. Update frontend totals and voting flows to consume explicit advanced/live subtotal semantics.
4. Run transition, counting, and eligibility regression suites before enabling in production.
5. Rollback plan: revert rule enforcement to previous behavior behind feature flags while preserving stored vote records.

## Open Questions

- Whether chair-approved carry-forward of advanced instructions on amendment should be implemented in this change or staged behind a dedicated follow-up flag.
- Whether any event-level override is needed for temporary tolerance of MembershipWorks connectivity failures.
