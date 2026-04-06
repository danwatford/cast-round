## ADDED Requirements

### Requirement: Canonical Database Technology Document
The project MUST maintain a canonical in-repository document that identifies the database technologies used by Cast Round and where each technology is applied.

#### Scenario: Document identifies current stack components
- **WHEN** a contributor reads the canonical database technologies document
- **THEN** the document SHALL explicitly identify the relational database engine used by the project
- **THEN** the document SHALL explicitly identify the ORM used by backend persistence
- **THEN** the document SHALL explicitly identify the migration framework and where migration entry points are defined
- **THEN** the document SHALL identify how session persistence relies on the database stack

### Requirement: Environment-Specific Usage Coverage
The canonical database technologies document MUST describe how the stack is used across local development and deployment workflows.

#### Scenario: Document covers local development database usage
- **WHEN** a developer follows local setup instructions for database services
- **THEN** the document SHALL describe local database service technology and access context
- **THEN** the document SHALL reference where local database infrastructure is configured in the repository

#### Scenario: Document covers deployment migration behavior
- **WHEN** a maintainer reviews deployment expectations for schema changes
- **THEN** the document SHALL describe where migration execution is defined in repository workflows
- **THEN** the document SHALL clearly note any environment differences that affect migration execution behavior

### Requirement: Change Synchronization
Changes to database technologies or their operational usage MUST include a corresponding update to the canonical database technologies document.

#### Scenario: DB technology change includes documentation update
- **WHEN** a change modifies database engine, ORM, migration framework, or DB-related workflow behavior
- **THEN** the same change set SHALL include updates to the canonical database technologies document reflecting the new state
- **THEN** the update SHALL preserve references to the authoritative code/config locations that substantiate the documented behavior
