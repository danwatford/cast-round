## 1. Audit schema and emission

- [ ] 1.1 Implement append-only audit entry schema with indexes for event timeline and actor queries.
- [ ] 1.2 Instrument all event-mutating handlers to emit canonical audit entries.
- [ ] 1.3 Implement before/after summary capture for update-style mutations.

## 2. Authorization and data-access policy

- [ ] 2.1 Implement official-role authorization guards for individual ballot inspection endpoints.
- [ ] 2.2 Ensure totals endpoints return subtotal data without leaking individual ballot records.
- [ ] 2.3 Implement audit emission for successful individual ballot inspection events.

## 3. Investigation workflows

- [ ] 3.1 Implement timeline query API with filters for event, motion, actor, action type, and represented identity.
- [ ] 3.2 Add pagination and deterministic ordering semantics for investigation results.
- [ ] 3.3 Add UI integration points for authorized complaint investigation workflows.

## 4. Verification and governance testing

- [ ] 4.1 Add authorization matrix tests for ballot inspection and audit retrieval endpoints.
- [ ] 4.2 Add integration tests validating audit coverage for all required mutating actions.
- [ ] 4.3 Add investigation scenario tests for changed-vote and delegated-misuse complaint flows.
