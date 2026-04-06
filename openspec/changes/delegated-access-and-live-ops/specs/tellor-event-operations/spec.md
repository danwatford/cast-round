## ADDED Requirements

### Requirement: Tellor accounts SHALL be provisioned per event
The system SHALL allow committee users to create one or more tellor assignments for a specific event and SHALL generate event-scoped login links for each assignment.

#### Scenario: Committee creates tellor assignment
- **WHEN** a committee user creates a tellor for an event
- **THEN** the system returns tellor assignment details and an event-scoped login link

#### Scenario: Tellor assignment is event-scoped
- **WHEN** a tellor is authenticated for one event
- **THEN** requests for non-assigned event data are denied

### Requirement: Tellor links SHALL follow single-active-token and revocation policy
The system SHALL enforce one active token per tellor assignment and SHALL support manual revocation that blocks future token use.

#### Scenario: Tellor token replacement revokes prior token
- **WHEN** a replacement tellor link is generated for an existing assignment
- **THEN** only the newest token remains valid

#### Scenario: Revoked tellor token is denied
- **WHEN** a tellor attempts login with a revoked token
- **THEN** authentication is rejected

### Requirement: Tellor permissions SHALL allow assisted vote submission within event scope
The system SHALL permit authenticated tellors to submit and update votes on behalf of eligible members only within their assigned event scope.

#### Scenario: Tellor submits assisted vote for assigned event
- **WHEN** a tellor submits votes on behalf of an eligible member for the assigned event
- **THEN** the system processes the submission under tellor authority

#### Scenario: Tellor cannot submit for non-assigned event
- **WHEN** a tellor attempts vote submission for a motion outside the assigned event
- **THEN** the system rejects the action
