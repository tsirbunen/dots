export function getMaxVotesPerAnswerAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this answer. Allowed max per answer (${maxCount}) already given.`
}

export function getMaxVotesPerPollAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this answer. Allowed total max (${maxCount}) already given.`
}

export function getPollInputFieldValueNotInRangeErrorMessage(
  fieldName: string,
  minValue: number,
  maxValue: number
): string {
  return `${fieldName} in poll input must be in range ${minValue} ... ${maxValue}`
}

export function getPollAnswerOptionsMustBeUniqueErrorMessage(answers: string[]): string {
  return `Poll answer options must be unique. This is not true for answer set ${JSON.stringify(answers)}`
}

export function getFindPollBytIdOrCodeRequiresIdOrCode(): string {
  return 'Find poll by ID or CODE needs either the ID or the CODE!'
}
