# GraphQL

## Global Object Identification

Each object is represented by `id` and `_id` of type `ID!`. The `id` attribute is computed - it is Base64 of `<type>-<ID>`.

For example, the `id` of `event` with `pk` equals to `event#bdf52237-cf11-4de1-8d78-f6e3b6fb517d` would be Base64 of `event-bdf52237-cf11-4de1-8d78-f6e3b6fb517d` which is `ZXZlbnQtYmRmNTIyMzctY2YxMS00ZGUxLThkNzgtZjZlM2I2ZmI1MTdk`. And `_id` of the same event would be `bdf52237-cf11-4de1-8d78-f6e3b6fb517d`.

## Pagination

For paginated output, use Relay-Style pagination.

Request:

```gql
query {
  events(first: 10) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

Response:

```json
{
  "data": {
    "events": {
      "edges": [
        {
          "node": {
            "id": "ZXZlbnQtYmRmNTIyMzctY2YxMS00ZGUxLThkNzgtZjZlM2I2ZmI1MTdk",
            "_id": "bdf52237-cf11-4de1-8d78-f6e3b6fb517d",
            "name": "Badminton doubles"
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": null,
        "endCursor": "<LastEvaluatedKey>"
      },
      "totalCount": 1
    }
  }
}
```

## Queries

### Get specific object

```gql
query {
  event(id: "ZXZlbnQtYmRmNTIyMzctY2YxMS00ZGUxLThkNzgtZjZlM2I2ZmI1MTdk") {
    id
    _id
    name
  }
}
```

## Mutations

### Create example

```gql
mutation {
  createEvent(input: {
    eventType: DOUBLES
    name: "Badminton for advanced players"
    description: "Doubles on multiple courts, where each team will play against every other team."
    date: "2026-01-20"
    time: "18:00"
    place: "Badminton Hall"
    court: "1, 2, 3"
    maxPlayers: 12
  }) {
    id
    _id
    name
    description
    date
    time
    court
  }
}
```

### Update example

```gql
mutation {
  updateEvent(input:{
    id: "ZXZlbnQtYmRmNTIyMzctY2YxMS00ZGUxLThkNzgtZjZlM2I2ZmI1MTdk"
    name: "Badminton doubles"
  }) {
    id
    _id
    name
  }
}
```

## Error Handling

Errors are returned in the standard GraphQL `errors` array alongside partial `data`.

### Error Response Structure

```json
{
  "data": {
    "createEvent": null
  },
  "errors": [
    {
      "message": "Event name is required",
      "path": ["createEvent"],
      "extensions": {
        "code": "VALIDATION_ERROR",
        "field": "name"
      }
    }
  ]
}
```

### Error Codes

| Code | Description |
| ---- | ----------- |
| `VALIDATION_ERROR` | Input validation failed |
| `NOT_FOUND` | Requested resource does not exist |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `CONFLICT` | Resource already exists or state conflict |

### Common Validation Errors

| Field | Constraint |
| ----- | ---------- |
| `name` | Required, max 100 characters |
| `date` | Required, format `YYYY-MM-DD`, must be future date |
| `time` | Required, format `HH:mm` |
| `maxPlayers` | Required, min 2, max 32 |
| `eventType` | Required, must be `SINGLES` or `DOUBLES` |
