## Context

The frontend already includes delegate and tellor routes and API contracts, but the required security and lifecycle semantics are not yet formalized as implementable requirements. This change defines robust operational behavior for delegated event access and live meeting synchronization.

Constraints:
- Links grant effective access and must be treated as confidential bearer tokens.
- Product direction requires one active token per delegate/tellor assignment with explicit manual revocation.
- Internal/API naming remains `tellor` for compatibility.

## Goals / Non-Goals

**Goals:**
- Define deterministic lifecycle for event-specific delegate and tellor links.
- Ensure delegated/tellor sessions are strictly event-scoped.
- Define a meeting-safe manual refresh interaction with elapsed-time feedback.
- Require revocation behavior that invalidates access immediately for future requests.

**Non-Goals:**
- Email-based link delivery and notification templates.
- Terminology migration from `tellor` to `teller` in API or persistence.
- Long-term audit retention and export packaging (handled in separate changes).

## Decisions

1. Delegate/tellor links are single-active-token credentials.
- Creating a replacement link invalidates the prior token for that assignment.
- Alternative considered: multi-token support. Rejected due to increased leakage and revocation complexity.

2. Revocation is explicit and immediate.
- Authorized users revoke links manually and subsequent token use is denied.
- Alternative considered: time-based expiry only. Rejected because meetings may span variable durations and require operator control.

3. Event scope is enforced at authentication and authorization boundaries.
- Delegated or tellor sessions are limited to the assigned event context for data access and voting actions.
- Alternative considered: path-level UI hiding only. Rejected because backend enforcement is required for security.

4. Live synchronization starts with manual refresh.
- UI provides explicit "check for changes" control and shows elapsed time since last successful check.
- Alternative considered: auto polling only. Rejected for this phase to reduce operational surprises and control load.

## Risks / Trade-offs

- [Bearer token leakage through copy/share mistakes] -> Mitigation: clear confidentiality messaging, easy revoke, and replacement token invalidation semantics.
- [Stale meeting content between manual checks] -> Mitigation: visible elapsed timer and operator guidance to re-check before key actions.
- [Role confusion across delegate and tellor experiences] -> Mitigation: strict event scope rules and capability-specific authorization tests.
- [Token revocation race with in-flight request] -> Mitigation: enforce token validity check at each protected request and return deterministic denial when revoked.

## Migration Plan

1. Add/confirm delegated-access token state fields (active/revoked/replaced timestamps and actor metadata).
2. Implement issuance/replacement/revocation logic for event group delegates and tellors.
3. Enforce event-scope authorization in affected API handlers.
4. Add frontend live refresh control and elapsed-time indicator for vote materials.
5. Rollback plan: disable new enforcement via feature flags while preserving token records for recovery.

## Open Questions

- Whether the elapsed timer should hard-warn after a threshold (for example 30 seconds) or remain informational only in this phase.
- Whether revoked sessions should be terminated immediately server-side or naturally denied on next request only.
