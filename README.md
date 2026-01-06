# HramBedminton.sk

## Database

### Entities

* User
* Match
  * Name
  * Description
  * Court(s)
  * Price
  * Invitees
  * Open for anyone
  * Attendees

| PK | SK | Attributes |
| -- | -- | ---------- |
| user#1 | user#1 | {} |
| match#1 | match#1 | {} |
| user#1 | match#1 | { "role": "owner | invited | attendee" } |
| match#1 | user#1 | { "role": "owner | invited | attendee" } |


## License

[MIT license](./LICENSE)
