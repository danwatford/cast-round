## ADDED Requirements

### Requirement: Authorized investigators SHALL be able to reconstruct event timelines
The system SHALL provide chronological audit retrieval for an event and SHALL support filtering by motion, actor, action type, and represented identity context.

#### Scenario: Investigator queries full event timeline
- **WHEN** an authorized investigator requests event audit history
- **THEN** the system returns entries in chronological order with pagination metadata

#### Scenario: Investigator filters by motion and action type
- **WHEN** an authorized investigator applies motion and action filters
- **THEN** only matching entries are returned in chronological order

### Requirement: Investigation views SHALL expose enough context to validate complaint claims
The system SHALL include in investigation results the actor context, target records, and before/after summaries needed to validate whether recorded actions match reported intent.

#### Scenario: Complaint review for changed vote
- **WHEN** an investigator reviews a complaint that a vote was altered
- **THEN** results include each relevant vote mutation with actor and before/after allocation summaries

#### Scenario: Complaint review for delegated misuse
- **WHEN** an investigator reviews a complaint about improper delegated action
- **THEN** results include represented identity context and delegate actor identity for each relevant operation
