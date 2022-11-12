import { createModule, gql } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { timestampScalar } from './timestamp-scalar'

const moduleName = 'CustomScalars'
const pathToFile = path.join(__dirname, 'schema.graphql')
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const CustomScalarsModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Timestamp: timestampScalar
  }
})
