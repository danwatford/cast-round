## 1. Delegated access lifecycle

- [ ] 1.1 Implement delegate link issuance with single-active-token replacement semantics.
- [ ] 1.2 Implement delegate link revocation endpoint and deny revoked-token authentication.
- [ ] 1.3 Enforce delegate event-scope authorization across protected event and motion endpoints.

## 2. Tellor provisioning and controls

- [ ] 2.1 Implement tellor creation and replacement flows with single-active-token behavior.
- [ ] 2.2 Implement tellor link revocation and blocked re-authentication behavior.
- [ ] 2.3 Enforce tellor event-scope permissions for assisted vote submission paths.

## 3. Live meeting refresh UX

- [ ] 3.1 Add manual "check for changes" control to live voting surfaces.
- [ ] 3.2 Implement elapsed-time-since-last-successful-check indicator and state updates.
- [ ] 3.3 Add error handling for failed refresh attempts while preserving last known material state.

## 4. Validation and security tests

- [ ] 4.1 Add integration tests for token replacement, revocation, and event-scope denial cases.
- [ ] 4.2 Add authorization matrix tests covering delegate and tellor actions by role and event scope.
- [ ] 4.3 Add frontend tests for manual refresh behavior and elapsed timer reset/continuation semantics.
