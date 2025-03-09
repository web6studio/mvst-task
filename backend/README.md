# Coffee and Tee List - MVST challenge Backend

## Scripts

The following scripts are here to help you get up and running in a development environment as quickly as possible.

### Installation

```bash
$ yarn install
```

### Running the database with docker

If you have docker installed on your machine, we have provided a script to easily spin up
a Postgres database.

```bash
$ yarn start:dev:db
```

### Running your own Postgres database

If you don't want to use docker, you can configure this by yourself. You will need to have Postgres installed. We will however use the Dockerfile when reviewing/running your backend code. Therefore, for us to easily run your project, please use the following configuration:

```
host: 'localhost'
port: 5432
username: 'postgres'
password: '1234'
database: 'mvst-coffee-challenge-db'
```

### Database Migrations

After starting the database, you need to run migrations to create tables and seed initial data:

```bash
# Run migrations to create tables and seed data
$ yarn migration:run

# If you need to revert the last migration
$ yarn migration:revert
```

The migrations will:

1. Create necessary database extensions
2. Create coffee types enum (Arabic, Robusta)
3. Create coffees table with all required fields
4. Seed initial coffee data

### Running the project in development mode

```bash
# Will run on port 5000
$ yarn start:dev
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
