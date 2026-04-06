## 1. Export package implementation

- [ ] 1.1 Implement event export endpoint returning required governance and voting datasets.
- [ ] 1.2 Implement deterministic export serialization ordering and schema validation tests.
- [ ] 1.3 Add performance-safe export generation for large event and audit datasets.

## 2. Lifecycle state enforcement

- [ ] 2.1 Add event lifecycle state model (`active`, `archived`, `deleted`) and transition validation.
- [ ] 2.2 Implement archive action and enforce read-only behavior for archived events.
- [ ] 2.3 Enforce delete precondition requiring archived state.

## 3. Authorization and safeguards

- [ ] 3.1 Implement committee-only authorization for archive/delete operations.
- [ ] 3.2 Implement explicit delete confirmation payload checks and rejection paths.
- [ ] 3.3 Update UI workflows to guide archive-first then delete with clear confirmation semantics.

## 4. Audit and verification

- [ ] 4.1 Emit audit entries for export, archive, and delete operations.
- [ ] 4.2 Add integration tests for lifecycle transitions and archived read-only denials.
- [ ] 4.3 Add authorization and confirmation-path tests for destructive operations.
