## ADDED Requirements

### Requirement: Event visibility SHALL follow role and schedule rules
The system SHALL expose all events to committee users at all times. The system SHALL expose events to non-committee voting users only when the current timestamp is within the event's configured start and end window.

#### Scenario: Committee sees draft event before member window
- **WHEN** a committee user requests events and an event start time is in the future
- **THEN** the event is included in the committee response

#### Scenario: Member cannot see event before start window
- **WHEN** a non-committee voting user requests events before an event start time
- **THEN** the event is excluded from the response

### Requirement: Motion status changes SHALL enforce valid transitions
The system SHALL validate each requested motion status change against the approved transition graph and reject disallowed transitions.

#### Scenario: Allowed transition is accepted
- **WHEN** a committee user requests a transition from `advanced` to `open`
- **THEN** the system persists the new status and returns success

#### Scenario: Disallowed transition is rejected
- **WHEN** a committee user requests a transition not present in the transition graph
- **THEN** the system rejects the request and does not modify motion status

### Requirement: Motion governance actions SHALL be committee-only
The system SHALL require committee authorization for creating events, editing events, creating motions, editing motions, and changing motion statuses.

#### Scenario: Committee can update motion status
- **WHEN** a committee user submits a valid status change request
- **THEN** the system authorizes and processes the request

#### Scenario: Non-committee cannot update motion status
- **WHEN** a non-committee user submits a motion status change request
- **THEN** the system returns forbidden and leaves data unchanged
