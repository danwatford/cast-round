## ADDED Requirements

### Requirement: Events SHALL implement explicit lifecycle states
The system SHALL represent event lifecycle state as `active`, `archived`, or `deleted` and SHALL enforce valid transitions.

#### Scenario: Active event transitions to archived
- **WHEN** an authorized archive action is performed on an active event
- **THEN** the event state becomes `archived`

#### Scenario: Archived event transitions to deleted
- **WHEN** an authorized delete action is performed on an archived event
- **THEN** the event state becomes `deleted`

### Requirement: Archived events SHALL be read-only
The system SHALL deny mutating operations on archived events, including event edits, motion edits, status changes, and vote mutations.

#### Scenario: Vote mutation on archived event is denied
- **WHEN** a user attempts to submit or change votes for a motion in an archived event
- **THEN** the system rejects the request

#### Scenario: Motion edit on archived event is denied
- **WHEN** a committee user attempts to edit motion details in an archived event
- **THEN** the system rejects the request
