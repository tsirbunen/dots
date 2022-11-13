export const nullable = (type: string | number | object): object => {
  return {
    anyOf: [
      {
        type: 'null'
      },
      type
    ]
  }
}

export const ID = {
  type: 'string',
  pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
}

export const DATE = {
  type: 'string',
  description: 'Time elapsed since January 1st, 1970, UTC, as exemplified by 1646474004529',
  pattern: '^[0-9]{1,13}$'
}
