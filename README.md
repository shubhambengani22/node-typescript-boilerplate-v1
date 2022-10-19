# node-typescript-boilerplate-v1

## Development setup

### Running Locally

We need to create a new .env and .env.test for running the project (DB and other sensitive information) locally, and for testing.

1. `npm install` to install the necessary dependencies.

## Scripts

- `npm run build` - Building the app.
- `npm run test` - Run automated test cases using `jest`.
- `npm run start` - For starting the app.
- `npm run start:dev` - For building and starting the app with auto-reload on changes.

## DB

Prisma has been used for setting up `postgres` database. In order to start fresh and set up the migrations, follow the steps below:

- `npx prisma init` - To set up the folder for `prisma` with `schema.prisma` and the `.env` file.
- Make necessary schema changes, following the one used in the project.
- `npm run migrate` - To run the migrations and update the schema in the DB as well

Note: In order to create and use the DB in testing, a new DB is recommended, follow the steps below for the same:

- Create a `.env.test` file with the same contents as the `.env` file, with changes in the database, and all the necessary key-value changes required to use it while testing.
- `npm run migrate:test` - To migrate the schema changes in the test DB.
