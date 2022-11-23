# DOTS

<br/>

### RUNNING THE PROGRAM

The DOTS-program can be run locally in development mode with the following instructions:

#### running the database

Start a PostgreSQL database locally with Docker:
`docker run --name postgres_for_dots -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=possupossu -e POSTGRES_DB=dots -d --rm postgres`

Install knex globally:
`npm install -g knex`

Run database migrations (in directory `server`)
`npx knex migrate:latest`
npx knex migrate:make <nimi tiedostolle>

docker images
docker pull postgres
docker ps -a
docker start postgres_for_dots
docker stop postgres_for_dots
docker rmi postgres_for_dots
docker images -f dangling=true
docker image prune
docker ps -a
docker rm ID_or_Name ID_or_Name
docker run --rm image_name

sudo lsof -i :5432
sudo kill -9 <pid>

#### running server

In a shell, in directory `/server` start a server with the command:
`npm run dev`

#### debugging server

When using VSC, debugging mode can be starting by launching `server` from the "RUN AND DEBUG" options. Launching server debugging causes server to be built and the resulting js-files to be debugged. If changes to ts-files are made, the debugger needs to be restarted.

<br/>

### RUNNING TESTS

#### server tests

In one shell, in directory `/server` first start a server with the command:
`npm run dev`

Then, in another shell, in directory `/server` run the tests with the command:
`npm run test`

NOTE: Running tests directly from VSC is not currently supported! Use console.

To run tests in a single file:
`npm run test-single-file <path to file>`
for example
`npm run test-single-file tests/tests/04_edit_poll.test.ts`
