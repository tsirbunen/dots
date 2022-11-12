# DOTS

<br/>

### RUNNING THE PROGRAM

The DOTS-program can be run locally in development mode with the following instructions:

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
