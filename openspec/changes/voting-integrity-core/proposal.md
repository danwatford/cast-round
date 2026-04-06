## Why

Cast Round already exposes event, motion, and vote workflows in the UI contracts, but the normative behavior for lifecycle, counting, and eligibility is not yet captured as implementable requirements. We need this now so voting outcomes are consistent, auditable, and aligned with Morris Federation process before expanding operational features.

## What Changes

- Define canonical event and motion governance behavior, including motion status transition rules that committee members can execute.
- Define written-ballot vote capture and counting behavior with role-weighted split voting for `GROUP_VOTER` and `INDIVIDUAL_VOTER`.
- Require separate advanced (proxy) and live subtotal accounting in tally interfaces and results views.
- Define amendment/substantive handling and supersede rules for previously submitted votes.
- Require voter eligibility and vote weight to be resolved from live MembershipWorks-linked account role state at action time.

## Capabilities

### New Capabilities
- `event-motion-governance`: Canonical lifecycle and status transition requirements for events and motions.
- `written-ballot-vote-counting`: Written-ballot vote submission, split weighting, advanced/live subtotals, and amendment supersede behavior.
- `membershipworks-live-eligibility`: Live role and eligibility resolution from MembershipWorks-linked account data at vote action time.

### Modified Capabilities
- None.

## Impact

- Backend APIs that serve event, motion, and motion-vote operations.
- Frontend event/motion/vote flows, including totals presentation for advanced/live subtotals.
- Domain and persistence models for vote records and response subtotals.
- Test suites covering lifecycle validity, weighted split voting, and eligibility checks.
