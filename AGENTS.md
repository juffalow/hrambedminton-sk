# Agents

## Project Overview

Badminton game planner. Player can create an event and invite other players. Players can be registered users or guests. An event is either singles (1v1) or doubles (2v2). An event can have multiple courts running simultaneously - for example, a doubles event with 8 players could have 4 players on court 1 and 4 players on court 2.

### Key Concepts

* **Event** - Game session with place, time, date, court and players. Can span multiple courts.
* **Event Type** - Either "singles" (1v1) or "doubles" (2v2).
* **Player** - Either a registered user or a guest (name + email only).
* **Team** - In doubles, each court has Team A vs Team B. Multiple courts use pairs: (A vs B), (C vs D), etc.

### Entities

Player (registered user):
* ID
* name
* email

Player (guest):
* ID (generated when added to event)
* name
* email

Event:
* ID
* event type (singles | doubles)
* name
* description
* date
* time
* max players count
* place
* court(s)
* owner ID (who created the event)

### Access Patterns

* Get user by ID
* Get event by ID
* Get all events for a user (owned, invited, attending)
* Get upcoming events (sorted by date) for a user (owned, invited, attending)
* Get all events for a guest user (invited, attending)
* Get all players (registered and guests) for an event
* Convert guest to registered user (link accounts)

## Tech Stack

**Frontend**: React 19 + TypeScript
**Backend**: AWS AppSync + AWS DynamoDB + AWS Cognito

## Project Structure

```
hrambedminton-sk/
├── docs/                 # Project documentation
├── infrastructure/       # Backend
├── webapp/               # Frontend
├── LICENSE
└── README.md
```
