## ADDED Requirements

### Requirement: Canonical Technology Stack Document
The project MUST maintain a canonical in-repository technology stack document that identifies the primary technologies used by Cast Round and where each technology is applied.

#### Scenario: Document identifies core technology domains
- **WHEN** a contributor reads the canonical technology stack document
- **THEN** the document SHALL explicitly identify the frontend framework/build tool stack
- **THEN** the document SHALL explicitly identify the backend runtime/framework stack
- **THEN** the document SHALL explicitly identify database and persistence technologies
- **THEN** the document SHALL explicitly identify infrastructure and deployment tooling used by the project

### Requirement: Authoritative Source Traceability
Each major section of the canonical technology stack document MUST reference authoritative repository files that substantiate the documented behavior.

#### Scenario: Stack claims are auditable
- **WHEN** a maintainer reviews any technology statement in the canonical technology stack document
- **THEN** the statement SHALL include references to source-of-truth files (for example package manifests, workflow files, config files, or runtime bootstrap modules)
- **THEN** the referenced files SHALL be sufficient for another contributor to verify the statement without external assumptions

### Requirement: In-Progress Technology Adoption Clarity
The canonical technology stack document MUST identify technologies that are being actively introduced and clearly communicate their adoption status and scope.

#### Scenario: Document captures ongoing backend technology migration
- **WHEN** the project is introducing a technology in phases (for example, adopting Effect for TypeScript in backend components)
- **THEN** the canonical technology stack document SHALL explicitly list the technology as in-progress rather than fully adopted
- **THEN** the document SHALL describe where the technology currently applies and where legacy approaches remain in use
- **THEN** the in-progress status SHALL reference authoritative source files that demonstrate current adoption state

### Requirement: Change Synchronization for Technology Updates
Changes that alter core technologies or stack usage MUST update the canonical technology stack document in the same change set.

#### Scenario: Technology change includes documentation update
- **WHEN** a change modifies frontend, backend, database, infrastructure/deployment, or local-dev technology composition or usage expectations
- **THEN** the same change set SHALL include updates to the canonical technology stack document reflecting the new state
- **THEN** the update SHALL preserve section-level references to authoritative source locations
