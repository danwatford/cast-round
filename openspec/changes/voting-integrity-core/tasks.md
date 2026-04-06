## 1. Lifecycle and authorization foundations

- [ ] 1.1 Implement server-side validation for event visibility windows and committee-only governance operations.
- [ ] 1.2 Implement and test motion status transition graph enforcement for all allowed and disallowed transitions.
- [ ] 1.3 Add API-level authorization checks for event/motion create, edit, and status changes.

## 2. Written-ballot capture and counting

- [ ] 2.1 Implement split-allocation submission persistence model supporting current/superseded/withdrawn states.
- [ ] 2.2 Enforce role-weight vote limits during submit/update/withdraw flows.
- [ ] 2.3 Implement tally computation that emits advanced/live subtotals and deterministic combined totals.
- [ ] 2.4 Add amendment/substantive handling that preserves history and invalidates prior current ballots for counting.

## 3. Live MembershipWorks eligibility checks

- [ ] 3.1 Implement action-time role resolution from MembershipWorks-linked account state for vote actions.
- [ ] 3.2 Recompute permitted vote weight on every vote action against motion role-vote definitions.
- [ ] 3.3 Add negative-path handling and tests for ineligible users, mapping gaps, and role changes between submissions.

## 4. Validation and regression coverage

- [ ] 4.1 Add unit and integration tests for lifecycle transitions and committee authorization matrix.
- [ ] 4.2 Add vote counting regression tests covering split allocations, re-submissions, and withdrawals across advanced/live buckets.
- [ ] 4.3 Add end-to-end tests validating totals DTO shape and consistency between API and UI displays.
