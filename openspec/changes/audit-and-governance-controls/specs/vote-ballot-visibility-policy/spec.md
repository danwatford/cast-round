## ADDED Requirements

### Requirement: Motion totals SHALL remain available independent of individual ballot visibility
The system SHALL provide authorized totals views according to existing event policy without requiring access to individual ballot details.

#### Scenario: User with totals permission can view subtotals
- **WHEN** a user with totals access requests motion totals
- **THEN** advanced/live and combined totals are returned

#### Scenario: Totals response omits individual ballot records
- **WHEN** totals are requested by a user without ballot-inspection permission
- **THEN** no per-voter ballot records are included

### Requirement: Individual ballot inspection SHALL be restricted to authorized officials
The system SHALL allow retrieval of per-voter ballot details only to explicitly authorized official roles.

#### Scenario: Authorized official retrieves individual ballot
- **WHEN** an authorized official requests a voter's ballot for a motion
- **THEN** the system returns the ballot details

#### Scenario: Non-official is denied ballot inspection
- **WHEN** a non-authorized user requests individual ballot details
- **THEN** the system denies access

### Requirement: Ballot-inspection access SHALL be auditable
The system SHALL create an audit entry for each successful individual ballot inspection operation.

#### Scenario: Ballot read by official is audited
- **WHEN** an authorized official successfully reads an individual ballot
- **THEN** an audit entry is persisted with actor, target ballot context, and timestamp
