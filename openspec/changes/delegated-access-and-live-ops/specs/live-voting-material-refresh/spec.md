## ADDED Requirements

### Requirement: Live voting screens SHALL provide manual material refresh
The system SHALL provide a user-invoked "check for changes" action on live voting screens to fetch the latest motion and voting material state.

#### Scenario: User manually checks for changes
- **WHEN** a user presses the "check for changes" control
- **THEN** the system requests fresh motion and voting material data and updates the view with latest results

#### Scenario: Refresh failure keeps current view with error feedback
- **WHEN** a manual refresh request fails
- **THEN** the current displayed data remains and the user receives an error indication

### Requirement: Live voting screens SHALL display elapsed time since last successful check
The system SHALL display elapsed time from the most recent successful refresh operation for the current live voting view.

#### Scenario: Elapsed time resets after successful refresh
- **WHEN** a manual refresh completes successfully
- **THEN** elapsed time resets to zero and begins incrementing

#### Scenario: Elapsed time continues after failed refresh
- **WHEN** a manual refresh fails
- **THEN** elapsed time continues from the last successful refresh timestamp
