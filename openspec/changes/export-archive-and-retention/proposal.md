## Why

Cast Round is intended for active-event operations rather than indefinite records retention. We need explicit export and lifecycle requirements so complete event records can be transferred to Morris Federation record-keeping systems and then safely removed from Cast Round.

## What Changes

- Define export package content requirements for event governance and voting records.
- Define post-export lifecycle where events become read-only archived prior to deletion.
- Define committee-controlled hard-delete behavior after archive confirmation.
- Require archive and delete operations to be authorized, confirmed, and audit logged.
- Define explicit event state model (`active`, `archived`, `deleted`) for lifecycle control.

## Capabilities

### New Capabilities
- `event-export-package`: Structured export requirements for events, motions, tallies, individual ballots per policy, and audit trails.
- `event-archive-lifecycle`: Read-only archived state and lifecycle transitions from active to archived to deleted.
- `archive-delete-audit-controls`: Authorization, confirmation, and audit safeguards for archive and deletion operations.

### Modified Capabilities
- None.

## Impact

- Backend export endpoints and serialization logic.
- Event persistence model and state transition enforcement.
- UI workflows for archive and delete operations.
- Audit subsystem coverage for lifecycle operations.
