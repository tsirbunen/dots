# DOTS - simple dot voting

**_Just create a poll, ask your friends to vote, and view the results._**
**_No need to create an account nor to come up with a password._**

<br/>

## OVERVIEW OF THE DOTS APP

DOTS system features a mobile ui and a web ui both supported by a server connected to a database.

### mobile ui

### web ui

- DOTS frontend is a [Next.js](https://nextjs.org) - [React](https://reactjs.org) - [Typescript](https://www.typescriptlang.org) app.
- For testing, [Cypress](https://docs.cypress.io/guides/overview/why-cypress) E2E testing was selected. To make the Cypress-experience more "cucumber-like" and to be able to include feature-files a [cucumber preprocessor](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor) was plugged in.
- Note that the web ui was designed mainly with only mobile users in mind.
- The main functionalities of the web ui are the following:

  1. A launch page shortly explaining how to use the app and containing buttons to enable navigation to main use modes (create poll, vote in poll and view poll).
  2. Language toggle button to enable switching between English and Finnish (visible on all pages).
  3. App header containing a hamburger menu to enable navigating within the app.

- To get an understanding of how the web ui works, perhaps a good way is to start is to examine the [feature-files](/frontend/cypress/features/launch-app/launch-app.feature) and to run Cypress testing in the visual "open" mode (see instructions below).

### server

- DOTS server is a Typescript [Fastify](https://www.fastify.io) server added with [GraphQL Helix](https://github.com/contra/graphql-helix) capabilities. The GraphQl schema is built with [GraphQL Modules](https://the-guild.dev/graphql/modules/docs) that enables adding small units piece-by-piece.
- In the DOTS there are only a couple of main entities. Each of the entities has a dedicated GraphQL module and an ORM model.
- PostgreSQL is used as the permanent data storage, and [Objection](https://vincit.github.io/objection.js/) and [Knex](https://knexjs.org/guide/) are used to manage the database.
- For testing, [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com) were selected.
- In the center of the DOTS "data model" is a **poll**. A poll has an **owner** and multiple voting options or **answers**. Each answer can have multiple **votes**.
- The main functionalities of the server are the following:
  1. creating a new poll
  2. giving a vote to a poll's answer option
  3. retrieving a poll with its data (answers and votes)
- Perhaps the best way to better understand the DOTS server is to study the tests, starting with [tests for creating a new poll](/server/tests/tests/02_create_poll.test.ts).

## RUNNING THE DOTS

The DOTS-program can be run locally in development mode with the following instructions:

#### running database

Start a PostgreSQL database locally with Docker:
`docker run --name postgres_for_dots -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=possupossu -e POSTGRES_DB=dots -d --rm postgres`

To get rid of possible earlier started database, first list the processes
`sudo lsof -i :5432`
and then kill them
`sudo kill -9 <pid>`

Install knex globally:
`npm install -g knex`

Run database migrations (in directory /server)
`npx knex migrate:latest`

To make changes to the database with a new migration (in directory /server)
`npx knex migrate:make <some name for the file>`

#### running server

Before starting the server, make sure you have a database running.
In a shell, in directory /server start a server with the command:
`npm run dev`

When using VSC, **debugging** mode can be starting by launching **server** from the "RUN AND DEBUG" options. Launching server debugging causes server to be built and the resulting js-files to be debugged. If changes to ts-files are made, the debugger needs to be restarted.
![Launch server image](/assets/image_launch_server.png)

#### running web ui

Before starting the frontend, make sure you have both a database and a server running.
In a shell, in directory /frontend start the frontend with the command:
`npm run dev`
Then open the browser at [http://localhost:3000](http://localhost:3000).
<br/>

### RUNNING TESTS

#### testing server

Before starting the server, make sure you have a database running.
In one shell, in directory /server first start a server with the command:
`npm run dev`

Then, in another shell, in directory /server run the tests with the command:
`npm run test`

NOTE: Running tests directly from VSC is not currently supported! Use console.

To run tests of a single file run
`npm run test-single-file <path to file>`
For example
`npm run test-single-file tests/tests/04_edit_poll.test.ts`

#### testing web ui

Before starting testing the frontend, make sure you have both a database and a server running.
In one shell, in directory /frontend first start a frontend with the command:
`npm run dev`
There are two options for running the cypress tests:

1. For one, open a new shell, cd to directory /frontend, and open the cypress LaunchPad with
   `npm run cypress:open`
   In the opening window, select "E2E Testing" by clicking it (see image below).
   ![Cypress LaunchPad](/assets/image_cypress_launchpad.png)
   Then select Chrome browser
   ![Cypress Browser selection](/assets/image_cypress_select_browser.png)
   And finally click the feature files you wish to run (one by one).
   ![Cypress Feature](/assets/image_cypress_feature.png)
   Cypress shows you the testing process live.
2. Alternatively you can open a new shell, cd to directory /frontend, and run the tests with
   `npm run cypress:run`
   In this case some testing information is logged to console. Also, you can view a Mochawesome html results file (by opening a file in the /cypress/results directory with, for example, the help of VSC plugin "Open in browser").
