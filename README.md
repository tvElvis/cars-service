## Installation

```bash
$ npm install
```

rename file `dev.sample.env` to `.env`

```bash
# run database in docker
$ docker-compose up -d
```

## Documentation

```bash
 http://localhost:3000/api/docs
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Migrations

```bash
# development
$ npm run migrate:run

# production mode
$ npm run migrate:prod
```
