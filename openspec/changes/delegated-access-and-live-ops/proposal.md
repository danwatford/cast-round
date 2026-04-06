## Why

Cast Round requires reliable event-scoped delegated access and in-meeting operational controls so voting can proceed even when designated representatives or assisted users cannot authenticate directly with MembershipWorks credentials. We need explicit requirements now to prevent insecure link handling and inconsistent live meeting behavior.

## What Changes

- Define event group delegate link issuance, activation, and revocation behavior for member contacts.
- Define tellor assignment and access behavior constrained to a single event scope.
- Standardize delegated login link policy as single active token per assignment with manual revocation.
- Define live voting operations behavior with manual "check for changes" and elapsed time since last successful check.
- Preserve existing internal/API `tellor` naming while allowing future UI aliasing without contract changes.

## Capabilities

### New Capabilities
- `event-delegated-access-links`: Event-specific delegate link lifecycle, confidentiality expectations, and revocation behavior.
- `tellor-event-operations`: Tellor provisioning and event-scoped voting assistance permissions.
- `live-voting-material-refresh`: Manual refresh workflow for live voting material with last-checked elapsed time display.

### Modified Capabilities
- None.

## Impact

- Delegate/tellor/clerk APIs and authentication entry points.
- Frontend event detail and motion voting surfaces for delegate/tellor operation.
- Persistence of delegated-access tokens and revocation metadata.
- UX state management for live refresh checks and stale-content indicators.
