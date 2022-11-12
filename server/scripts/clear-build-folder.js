/* eslint-disable @typescript-eslint/no-var-requires */
const rimraf = require('rimraf')

rimraf('./build', () => {
  console.log('Deleted build-folder with all of its contents (prior to tsc)!')
})
