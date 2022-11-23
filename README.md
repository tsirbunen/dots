# DOTS - simple dot voting

**_Just create a poll, ask your friends to vote, and view the results._**
**_No need to create an account or to come up with a password._**

<br/>

## OVERVIEW OF THE DOTS

DOTS system features a mobile ui and a web ui both supported by a server connected to a database.

### mobile ui

### web ui (intended mainly for mobile use)

### server

- DOTS server is a [Fastify](https://www.fastify.io) server added with [GraphQL Helix](https://github.com/contra/graphql-helix) capabilities. The GraphQl schema is built with [GraphQL Modules](https://the-guild.dev/graphql/modules/docs) that enables adding small units piece-by-piece.
- In the DOTS there are only a couple of main entities. Each of the entities has a dedicated GraphQL module and an ORM model.
- PostgreSQL is used as the permanent data storage, and [Objection](https://vincit.github.io/objection.js/) and [Knex](https://knexjs.org/guide/) are used to manage the database.
- For testing, [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com) were selected.
- In the center of the DOTS "data model" is a **POLL**. A poll has an **OWNER** and multiple voting options or **ANSWERS**. Each answer can have multiple **VOTES**.
- The main functionalities of the server are the following:
  1. creating a new poll
  2. giving a vote to a poll's option
  3. retrieving a poll with its data (answers and votes)
- Perhaps the best way to better understand the DOTS server is to study the tests, starting with [tests for creating a new poll](/server/tests/tests/02_create_poll.test.ts).

## RUNNING THE DOTS

The DOTS-program can be run locally in development mode with the following instructions:

#### running the database

Start a PostgreSQL database locally with Docker:
`docker run --name postgres_for_dots -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=possupossu -e POSTGRES_DB=dots -d --rm postgres`

To get rid of possible earlier started database, first list the processes
`sudo lsof -i :5432`
and then kill them
`sudo kill -9 <pid>`

Install knex globally:
`npm install -g knex`

Run database migrations (in directory `server`)
`npx knex migrate:latest`

To make changes to the database with a new migration (in directory `server`)
`npx knex migrate:make <some name for the file>`

#### running server

In a shell, in directory `/server` start a server with the command:
`npm run dev`

#### debugging server

When using VSC, debugging mode can be starting by launching `server` from the "RUN AND DEBUG" options. Launching server debugging causes server to be built and the resulting js-files to be debugged. If changes to ts-files are made, the debugger needs to be restarted.
![Launch server image](/assets/image_launch_server.png)

<br/>

### RUNNING TESTS

#### server tests

In one shell, in directory `/server` first start a server with the command:
`npm run dev`

Then, in another shell, in directory `/server` run the tests with the command:
`npm run test`

NOTE: Running tests directly from VSC is not currently supported! Use console.

To run tests of a single file run
`npm run test-single-file <path to file>`
For example
`npm run test-single-file tests/tests/04_edit_poll.test.ts`
