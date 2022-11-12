/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const appRootPath = require('app-root-path')

const serverRootPath = appRootPath.path
const modulesSourcePath = path.join(serverRootPath, 'modules')
const modulesTargetPath = path.join(serverRootPath, 'build/modules')

fs.readdirSync(modulesSourcePath).forEach((directory) => {
  const modulePath = path.join(modulesSourcePath, directory)
  const targetModulePath = path.join(modulesTargetPath, directory)
  fs.readdirSync(modulePath).forEach((moduleFile) => {
    if (moduleFile === 'schema.graphql') {
      const sourceFilePath = path.join(modulePath, 'schema.graphql')
      const targetFilePath = path.join(targetModulePath, 'schema.graphql')
      fs.copyFileSync(sourceFilePath, targetFilePath)
    } else {
      if (moduleFile.split('.')[1] !== 'ts') {
        throw new Error('Of files other than "*.ts" files only "schema.graphql" files are copied to build folder!')
      }
    }
  })
})

console.log('Copied non-ts-files to build-folder!')
