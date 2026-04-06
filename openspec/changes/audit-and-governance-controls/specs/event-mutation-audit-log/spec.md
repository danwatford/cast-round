## ADDED Requirements

### Requirement: Event-mutating operations SHALL emit immutable audit entries
The system SHALL create an append-only audit entry for each operation that mutates event-related records, including vote submissions, vote updates, vote withdrawals, motion status changes, and delegate/tellor/clerk assignment changes.

#### Scenario: Vote submission creates audit entry
- **WHEN** a vote submission is accepted
- **THEN** an audit entry is persisted describing the action, actor context, target motion, and payload summary

#### Scenario: Motion status update creates audit entry
- **WHEN** a motion status transition is applied
- **THEN** an audit entry is persisted containing previous status and new status

### Requirement: Audit entries SHALL include actor attribution context
Each audit entry SHALL include actor identity, actor role context, and on-behalf-of identity when applicable.

#### Scenario: Delegate action records represented identity
- **WHEN** a delegate submits a vote on behalf of a represented member
- **THEN** the audit entry includes both delegate actor identity and represented identity

#### Scenario: Direct member action records no on-behalf override
- **WHEN** a member submits their own vote
- **THEN** the audit entry includes the member identity and a null or absent on-behalf override

### Requirement: Audit payloads SHALL capture before/after state summaries
For update operations, audit entries SHALL include deterministic before/after summaries sufficient to understand what changed.

#### Scenario: Vote update records allocation diff
- **WHEN** a voter changes ballot allocations
- **THEN** the audit entry includes previous allocation summary and new allocation summary

#### Scenario: Delegate revocation records state change
- **WHEN** a delegate link is revoked
- **THEN** the audit entry includes prior token state and revoked state
