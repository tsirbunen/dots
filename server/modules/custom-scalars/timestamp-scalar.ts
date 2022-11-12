import { GraphQLScalarType, Kind, ValueNode } from 'graphql'

export const timestampScalar = new GraphQLScalarType({
  name: 'Timestamp',
  description: `
    Custom scalar type representing date and time. 
    When sending the datetime data to client, it is transformed into ECMAScript epoch milliseconds.
    When receiving data, it is expected to be a number representing the ECMAScript epoch milliseconds 
    (if in JSON as part of variables) or as the respective string (if hardcoded in the query). 
  `,
  serialize(value: Date) {
    verifyValueIsAProperDate(value)
    return value.getTime()
  },
  parseValue(value: unknown) {
    verifyValueIsAValidNumberForDatetime(value)
    return new Date(value as number)
  },
  parseLiteral(ast) {
    verifyValueIsAProperASTValue(ast)
    return new Date(parseInt((ast as { value: string }).value))
  }
})

const INVALID_DATE_VALUE_ERROR = 'Timestamp coming from database must be of type Date.'
const INVALID_EPOCH_DATETIME_VALUE_ERROR =
  'Timestamp value must be a valid number in ECMAScript epoch milliseconds format.'

const verifyValueIsAProperDate = (value: unknown): void => {
  if (!(value instanceof Date)) {
    throw new Error(INVALID_DATE_VALUE_ERROR)
  }
}

const verifyValueIsAValidNumberForDatetime = (value: unknown): void => {
  if (typeof value !== 'number') {
    throw new Error(INVALID_EPOCH_DATETIME_VALUE_ERROR)
  }
  try {
    const dateTime = new Date(value)
    if (dateTime.getTime() !== value) {
      throw new Error(INVALID_EPOCH_DATETIME_VALUE_ERROR)
    }
  } catch (error) {
    throw new Error(INVALID_EPOCH_DATETIME_VALUE_ERROR)
  }
}

const verifyValueIsAProperASTValue = (ast: ValueNode): void => {
  if (ast.kind === Kind.INT) {
    verifyValueIsAValidNumberForDatetime(parseInt(ast.value))
    return
  }
  throw new Error(INVALID_EPOCH_DATETIME_VALUE_ERROR)
}
