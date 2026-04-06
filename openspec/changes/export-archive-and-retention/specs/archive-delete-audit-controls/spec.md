## ADDED Requirements

### Requirement: Archive and delete actions SHALL require committee authorization
The system SHALL restrict archive and delete lifecycle actions to committee-authorized users.

#### Scenario: Committee can archive event
- **WHEN** a committee-authorized user requests event archive
- **THEN** the system processes the archive transition

#### Scenario: Non-committee cannot delete event
- **WHEN** a non-committee user requests event deletion
- **THEN** the system denies access

### Requirement: Delete actions SHALL require explicit confirmation and archived precondition
The system SHALL require an explicit confirmation payload for deletion and SHALL reject deletion unless the event is already archived.

#### Scenario: Delete without archived state is rejected
- **WHEN** a delete request is submitted for an active event
- **THEN** the system rejects the request

#### Scenario: Delete without confirmation is rejected
- **WHEN** an authorized user submits a delete request without required confirmation fields
- **THEN** the system rejects the request

### Requirement: Export, archive, and delete operations SHALL be audit logged
The system SHALL create audit entries for export generation, archive transitions, and delete operations including actor and target event context.

#### Scenario: Archive action is audited
- **WHEN** an event is archived
- **THEN** an audit entry is persisted with actor, event id, and resulting state

#### Scenario: Delete action is audited
- **WHEN** an event deletion is completed
- **THEN** an audit entry is persisted with actor, event id, and resulting state
