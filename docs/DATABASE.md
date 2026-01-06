# Database

## Naming convention

* Database attributes use camelCase (e.g., `createdAt`, `eventType`)
* PK, SK, GSI1PK, GSI1SK use `#` as delimiter (e.g., `user#<id>`, `date#2026-01-15#time#18:00`)
* Entity prefixes are lowercase (e.g., `user#`, `event#`, `guest#`, `owner#`, `email#`)

### Single Table Design

| PK | SK | GSI1PK | GSI1SK | team | Attributes |
| -- | -- | ------ | ------ | ---- | ---------- |
| user#<user ID> | user#<user ID> | - | - | - | id, email, name, createdAt |
| event#<event ID> | event#<event ID> | owner#<user ID> | date#<date>#time#<time> | - | name, description, place |
| event#<event ID> | user#<user ID> | user#<user ID> | event#<date>#<event ID> | A | role, status, joinedAt |
| event#<event ID> | user#<user ID> | user#<user ID> | event#<date>#<event ID> | A | role, status, joinedAt |
| event#<event ID> | guest#<guest ID> | email#<email> | event#<date>#<event ID> | B | role, status, joinedAt |
| event#<event ID> | guest#<guest ID> | email#<email> | event#<date>#<event ID> | B | role, status, joinedAt |
| event#<event ID> | guest#<guest ID> | email#<email> | event#<date>#<event ID> | C | role, status, joinedAt |
| event#<event ID> | guest#<guest ID> | email#<email> | event#<date>#<event ID> | C | role, status, joinedAt |
| user#<user ID> | event#<event ID> | - | - | - | role, status |

### Detailed Item Examples

User Item:

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

Event Item:

```json
{
  "PK": "event#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "SK": "event#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "GSI1PK": "owner#550e8400-e29b-41d4-a716-446655440000",
  "GSI1SK": "date#2026-01-15#time#18:00",
  "Type": "Event",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "eventType": "doubles",
  "name": "Wednesday evening doubles",
  "description": "Wednesday evening doubles",
  "place": "Športová hala",
  "date": "2026-01-15",
  "time": "18:00",
  "maxPlayers": 4,
  "court": "1",
  "ownerId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2026-01-04T10:00:00Z"
}
```

EventPlayer (registered player) Item:

```json
{
  "PK": "event#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "SK": "user#550e8400-e29b-41d4-a716-446655440000",
  "GSI1PK": "user#550e8400-e29b-41d4-a716-446655440000",
  "GSI1SK": "event#2026-01-15#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "Type": "EventPlayer",
  "team": "A",
  "role": "owner",
  "status": "confirmed",
  "joinedAt": "2026-01-04T10:00:00Z",
  "userName": "John Doe",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

EventPlayer (guest player) Item:

```json
{
  "PK": "event#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "SK": "guest#b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "GSI1PK": "email#guest@example.com",
  "GSI1SK": "event#2026-01-15#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "Type": "EventPlayer",
  "team": "B",
  "role": "attendee",
  "status": "confirmed",
  "joinedAt": "2026-01-04T10:00:00Z",
  "guestId": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "name": "Jane Smith",
  "email": "guest@example.com"
}
```

### Player Role & Status

Roles:
* `owner` - Created the event
* `invited` - Was invited to the event
* `attendee` - Joined the event

Status:
* `pending` - Invitation pending
* `confirmed` - Player confirmed attendance
* `declined` - Player declined invitation
