import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'

const moduleName = 'Query'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const QueryModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs
})
