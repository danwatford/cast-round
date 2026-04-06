## Why

Cast Round needs formal governance controls to investigate disputed outcomes and prove that vote-related updates were performed by authorized actors. Without explicit audit and visibility requirements, complaints about voting intent cannot be resolved reliably.

## What Changes

- Define comprehensive audit logging requirements for all event-mutating operations.
- Require actor attribution across member, delegate, tellor, clerk, and committee pathways.
- Define ballot visibility policy where individual voter choices are restricted to authorized officials, while general users see totals only.
- Define query and timeline reconstruction requirements to support complaint investigation and operational review.
- Require audit coverage of vote submit/update/withdraw, motion status changes, and delegate/tellor/clerk management actions.

## Capabilities

### New Capabilities
- `event-mutation-audit-log`: Immutable audit records for all event-related mutations with actor and before/after detail.
- `vote-ballot-visibility-policy`: Authorization requirements for totals versus individual ballot access.
- `audit-investigation-workflows`: Query/report behaviors to reconstruct event action timelines and investigate disputes.

### Modified Capabilities
- None.

## Impact

- Backend mutation handlers and domain event publishing.
- Persistence schema for audit entries and supporting indexes.
- Authorization middleware for ballot-level read access.
- UI/API surfaces for restricted audit and individual-ballot inspection.
