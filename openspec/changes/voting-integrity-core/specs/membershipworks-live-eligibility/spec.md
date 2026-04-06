## ADDED Requirements

### Requirement: Vote action authorization SHALL use live MembershipWorks-linked role state
The system SHALL resolve a voter identity's effective voting roles from current MembershipWorks-linked account state at submission, update, and withdrawal time.

#### Scenario: Role change affects next submission attempt
- **WHEN** MembershipWorks-linked role mapping changes between two submission attempts
- **THEN** the second attempt is validated using the updated role mapping

#### Scenario: Ineligible voter is denied
- **WHEN** a user without an effective voting role attempts to submit motion votes
- **THEN** the system rejects the request as unauthorized for voting

### Requirement: Permitted vote weight SHALL be recomputed at action time
The system SHALL recompute permitted vote weight for each vote action from the motion's role-vote definition and the caller's current effective roles.

#### Scenario: Reduced role weight limits future submission
- **WHEN** a voter's effective role changes from group to individual between submissions
- **THEN** the next accepted submission cannot exceed the individual weight defined for the motion

#### Scenario: Missing role mapping blocks submission
- **WHEN** no motion role-vote definition matches the caller's effective roles
- **THEN** the system rejects the submission and does not mutate current ballot state
