# User Management

## Architecture Decision: Dual User Storage

Users are stored in **both** AWS Cognito and DynamoDB, each serving different purposes.

### AWS Cognito Purpose

Handles authentication and identity management:
- User credentials (password, MFA)
- Authentication tokens and sessions
- Sign up, sign in, password reset flows
- Email/phone verification
- User pool attributes

### DynamoDB Purpose

Handles application data and relationships:
- User records for relational queries
- Event ownership and participation
- Complex query patterns via GSI
- High-performance data access
- Single-table design consistency

## Why Store Users in Both?

### 1. Relational Data
Events, EventPlayer, and other entities need to reference users:
```json
{
  "PK": "event#a1b2c3d4-...",
  "SK": "event#a1b2c3d4-...",
  "ownerId": "550e8400-..."  // References user in DynamoDB
}
```

### 2. Query Patterns
Application requires efficient queries:
- Get all events for a user (uses GSI: `user#<id>`)
- Get all players in an event (query by PK: `event#<id>`)
- Get upcoming events for a user (GSI with date sorting)

Cognito API is not designed for these application-level queries.

### 3. Performance
- DynamoDB: Single-digit millisecond latency
- Cognito API: Slower, rate-limited, requires HTTP calls
- Caching user data in DynamoDB avoids repeated Cognito lookups

### 4. Single-Table Design
Access patterns require user records co-located with events in the same table for efficient GSI queries.

## Implementation Pattern

### User Creation Flow

1. User signs up via Cognito (webapp → Amplify → Cognito)
2. Cognito PostConfirmation trigger fires Lambda
3. Lambda creates User item in DynamoDB using Cognito `sub` as ID

### User Record Structure

```json
{
  "PK": "user#550e8400-e29b-41d4-a716-446655440000",
  "SK": "user#550e8400-e29b-41d4-a716-446655440000",
  "Type": "User",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "player@example.com",
  "name": "John Doe",
  "createdAt": "2026-01-04T10:00:00Z"
}
```

### Data Ownership

| Data Type | Stored In | Source of Truth |
| --------- | --------- | --------------- |
| Password, credentials | Cognito | Cognito |
| Auth tokens, sessions | Cognito | Cognito |
| MFA secrets | Cognito | Cognito |
| Email verification status | Cognito | Cognito |
| User ID (`sub`) | Both | Cognito |
| Email, name | Both | Cognito (cached in DynamoDB) |
| User relationships | DynamoDB | DynamoDB |
| Event ownership | DynamoDB | DynamoDB |

### Synchronization

- Cognito is the source of truth for identity attributes (email, name)
- Changes to user attributes in Cognito should propagate to DynamoDB via Lambda triggers
- DynamoDB user records should use Cognito `sub` as the immutable ID
- Never store authentication credentials in DynamoDB

## What NOT to Store in DynamoDB

- Passwords or password hashes
- Authentication tokens (access, refresh, ID tokens)
- MFA secrets or recovery codes
- Email/phone verification tokens
- Session data

These are security-sensitive and handled entirely by Cognito.
