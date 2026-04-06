## ADDED Requirements

### Requirement: Written-ballot submissions SHALL support split vote allocation
The system SHALL accept per-response vote allocations for a motion and SHALL permit a voter to distribute their available vote weight across multiple responses.

#### Scenario: Group voter splits allocations across responses
- **WHEN** a `GROUP_VOTER` submits allocations totalling 10 across two or more responses
- **THEN** the system stores all allocations as one current submission for that voter and motion

#### Scenario: Individual voter submits single allocation
- **WHEN** an `INDIVIDUAL_VOTER` submits one allocation with count 1
- **THEN** the system stores the allocation as one current submission for that voter and motion

### Requirement: Submission totals SHALL be constrained by permitted role weight
The system SHALL compute permitted vote weight from applicable voting roles and SHALL reject any submission whose allocated total exceeds the permitted weight.

#### Scenario: Submission exceeding permitted weight is rejected
- **WHEN** a voter with permitted weight 1 submits allocations totalling 2
- **THEN** the system rejects the submission and preserves the previously current submission state

#### Scenario: Submission at permitted weight is accepted
- **WHEN** a voter with permitted weight 10 submits allocations totalling 10
- **THEN** the system accepts the submission

### Requirement: Tally outputs SHALL provide separate advanced and live subtotals
The system SHALL calculate and expose subtotals by response code and by vote bucket (`advanced` and `live`) and SHALL expose a deterministic combined total derived from both buckets.

#### Scenario: Advanced and live votes are returned separately
- **WHEN** totals are requested for a motion with both advanced and live submissions
- **THEN** the response contains subtotal rows distinguishing `advanced=true` from `advanced=false`

#### Scenario: Combined total equals bucket sum
- **WHEN** totals are requested for a response code
- **THEN** the combined total equals advanced subtotal plus live subtotal for that response code

### Requirement: New submissions SHALL supersede prior current submissions
The system SHALL mark a voter's prior current submission for a motion as superseded when a new submission is accepted, and only the latest current submission SHALL contribute to outcome counting.

#### Scenario: Re-submission replaces current counts
- **WHEN** a voter submits a new valid ballot for the same motion
- **THEN** the previous current ballot is marked superseded and excluded from current tally computation

#### Scenario: Withdraw removes current contribution
- **WHEN** a voter withdraws their ballot for a motion
- **THEN** the current submission is marked withdrawn and contributes zero to current tally computation

### Requirement: Amendment transition SHALL preserve history and require explicit current state
The system SHALL retain pre-amendment submissions for traceability and SHALL ensure only submissions marked current for the active substantive motion text are included in resolution counting.

#### Scenario: Amendment invalidates prior current submissions for counting
- **WHEN** a motion is amended into substantive form
- **THEN** prior submissions are retained but no longer counted as current until explicitly re-applied by authorized action

#### Scenario: History remains queryable after amendment
- **WHEN** authorized users inspect motion submission history
- **THEN** pre-amendment and post-amendment submissions are both present with clear status markers
