## ADDED Requirements

### Requirement: The system SHALL provide complete event export packages
The system SHALL generate an export package for an event containing event metadata, motions, vote totals, individual ballot records according to policy, and related audit entries.

#### Scenario: Committee requests event export package
- **WHEN** an authorized committee user requests export for an event
- **THEN** the system returns an export package containing all required record categories

#### Scenario: Export includes audit history
- **WHEN** an event export is generated
- **THEN** the package contains audit entries relevant to that event

### Requirement: Export generation SHALL be deterministic for the same snapshot
For a given event state snapshot, the system SHALL produce deterministic export content ordering and schema structure.

#### Scenario: Repeated export without intervening changes
- **WHEN** two export requests are generated for the same unchanged event state
- **THEN** both exports contain equivalent records in deterministic order and structure
