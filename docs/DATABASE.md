# Database

## Naming convention

* Database attributes use camelCase (e.g., `createdAt`, `eventType`)
* PK, SK and GSI keys use `#` as delimiter (e.g., `user#<id>`, `startsAt#2026-01-15T17:00:00.000Z`)
* Entity prefixes are lowercase (e.g., `user#`, `event#`, `guest#`, `owner#`, `email#`)

### Single Table Design

| PK | SK | GSI1PK | GSI1SK | GSI2PK | GSI2SK | team | Attributes |
| -- | -- | ------ | ------ | ------ | ------ | ---- | ---------- |
| user#<user ID> | user#<user ID> | type#user | createdAt#<createdAt> | - | - | - | id, email, name, createdAt |
| event#<event ID> | event#<event ID> | type#event | startsAt#<startsAt>#<event ID> | owner#<user ID> | startsAt#<startsAt> | - | name, description, place, date, time, timeZone, startsAt |
| event#<event ID> | user#<user ID> | type#eventPlayer | joinedAt#<joinedAt> | user#<user ID> | owner#event#<startsAt>#<event ID> or joined#event#<startsAt>#<event ID> | A | role, status, joinedAt |
| event#<event ID> | guest#<guest ID> | type#eventPlayer | joinedAt#<joinedAt> | email#<email> | event#<startsAt>#<event ID> | B | role, status, joinedAt |
| user#<user ID> | event#<event ID> | - | - | - | - | - | role, status |

### Indexes

* `GSI1` - all items of one entity type, sorted by date. Used for listing (the `events` query, admin).
  * `type#user` sorted by `createdAt#<createdAt>`
  * `type#event` sorted by `startsAt#<startsAt>#<event ID>` (unique, used as the cursor of the `events` query)
  * `type#eventPlayer` sorted by `joinedAt#<joinedAt>`
  
  Each type is one partition, which is fine for now; split it by month (`type#event#2026-01`) if it ever gets too hot.
* `GSI2` - relations, sorted by start:
  * `owner#<id>` - Event items of an owner
  * `user#<id>` - EventPlayer items of a registered user. The sort key starts with the relation:
    `owner#event#<startsAt>#<event ID>` for events the user created, `joined#event#<startsAt>#<event ID>` for
    events they joined. Used by `me { events(filter: OWNED | JOINED) }`, one exact range query per filter.
  * `email#<email>` - EventPlayer items of a guest

### Detailed Item Examples

User Item:

```json
{
  "PK": "user#550e8400-e29b-41d4-a716-446655440000",
  "SK": "user#550e8400-e29b-41d4-a716-446655440000",
  "GSI1PK": "type#user",
  "GSI1SK": "createdAt#2026-01-04T10:00:00.000Z",
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
  "GSI1PK": "type#event",
  "GSI1SK": "startsAt#2026-01-15T17:00:00.000Z#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "GSI2PK": "owner#550e8400-e29b-41d4-a716-446655440000",
  "GSI2SK": "startsAt#2026-01-15T17:00:00.000Z",
  "Type": "Event",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "eventType": "doubles",
  "name": "Wednesday evening doubles",
  "description": "Wednesday evening doubles",
  "place": "Športová hala",
  "date": "2026-01-15",
  "time": "18:00:00",
  "timeZone": "Europe/Bratislava",
  "startsAt": "2026-01-15T17:00:00.000Z",
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
  "GSI1PK": "type#eventPlayer",
  "GSI1SK": "joinedAt#2026-01-04T10:00:00.000Z",
  "GSI2PK": "user#550e8400-e29b-41d4-a716-446655440000",
  "GSI2SK": "owner#event#2026-01-15T17:00:00Z#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "Type": "EventPlayer",
  "team": "A",
  "role": "owner",
  "status": "confirmed",
  "joinedAt": "2026-01-04T10:00:00Z",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "player@example.com"
}
```

EventPlayer (guest player) Item:

```json
{
  "PK": "event#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "SK": "guest#b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "GSI1PK": "type#eventPlayer",
  "GSI1SK": "joinedAt#2026-01-04T10:00:00.000Z",
  "GSI2PK": "email#guest@example.com",
  "GSI2SK": "event#2026-01-15T17:00:00.000Z#a1b2c3d4-e5f6-7890-abcd-ef1234567890",
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

### Event date and time

* `date` and `time` are the wall-clock time at the venue, as players see it (`time` is always `HH:mm:ss`)
* `timeZone` is the IANA time zone of the venue (e.g. `Europe/Bratislava`), defaults to `Europe/Bratislava`
* `startsAt` is the same moment in UTC (ISO 8601), used for sorting (GSI1SK) and for checking if the event has started

### Player Role & Status

Roles:
* `owner` - Created the event
* `invited` - Was invited to the event
* `attendee` - Joined the event

Status:
* `pending` - Invitation pending
* `confirmed` - Player confirmed attendance
* `declined` - Player declined invitation
