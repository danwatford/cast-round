## ADDED Requirements

### Requirement: Event group delegate links SHALL be event-specific bearer credentials
The system SHALL issue delegate login links scoped to exactly one event and one represented account identity. Possession of the link SHALL grant delegate access for that assignment.

#### Scenario: Delegate link grants event-scoped session
- **WHEN** a valid delegate link is used for login
- **THEN** the resulting session is authorized only for the delegated event and represented account context

#### Scenario: Delegate cannot access other events
- **WHEN** an authenticated delegate requests data outside their assigned event
- **THEN** the system denies access

### Requirement: Delegate assignment SHALL have one active link token
The system SHALL maintain at most one active token for each event group delegate assignment. Generating a replacement token SHALL revoke any previously active token for that assignment.

#### Scenario: Replacement invalidates prior token
- **WHEN** a member contact generates a new delegate link for the same assignment
- **THEN** the previous token is no longer valid for authentication

#### Scenario: First issuance creates active token
- **WHEN** a delegate link is created where no prior active token exists
- **THEN** the new token is marked active

### Requirement: Authorized users SHALL be able to revoke delegate links
The system SHALL allow authorized users to revoke an event delegate link at any time and SHALL deny future authentications using that token.

#### Scenario: Revoked token login attempt is rejected
- **WHEN** a revoked delegate token is used to authenticate
- **THEN** authentication fails and no delegated session is created

#### Scenario: Revocation does not remove historical assignment metadata
- **WHEN** a delegate link is revoked
- **THEN** assignment metadata remains available for operational traceability
