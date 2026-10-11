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

## Deployment

### Development environment

```sh
aws sso login --profile juffdev
```

```sh
yarn run deploy:all -c stage=development --profile juffdev
```

### Production environment

```sh
aws sso login --profile juffprod
```

```sh
yarn run deploy:all -c stage=production --profile juffprod
```



## License

[MIT license](./LICENSE)
