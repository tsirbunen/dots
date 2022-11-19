import { DataClassType } from '../types/types'

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

export function getPollAnswerOptionsMustBeUniqueErrorMessage(answers: unknown[]): string {
  return `Poll answer options must be unique. This is not true for answer set ${JSON.stringify(answers)}`
}

export function getFindPollBytIdOrCodeRequiresIdOrCode(): string {
  return 'Find poll by ID or CODE needs either the ID or the CODE!'
}

export function getAnswerIsNotOfSpecifiedDataClassErrorMessage(answer: unknown, dataClass: DataClassType): string {
  return `Answer ${JSON.stringify(answer)} is not a string as specified by the given DataClass ${dataClass}!`
}

export function getDataClassNotImplementedErrorMessage(dataClass: unknown): string {
  return `DataClass ${JSON.stringify(dataClass)} not implemented!`
}

export function getDataClassMustBeProvidedIfAnswersPresentErrorMessage(): string {
  return 'When answer options are provided, also the DataClass must be specified.'
}

export function getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage(): string {
  return 'When one of total votes and option votes maxima is given, both must be given.'
}

export function getSomeInputValueMustBeGivenForEditingPollErrorMessage(): string {
  return 'Some input value must be given when editing a poll.'
}

export function getNotAuthenticatedToPerformThisActionErrorMessage(): string {
  return 'Not authenticated to perform this action!'
}

export function getOwnerIdIsMissingFromContextErrorMessage(): string {
  return 'Owner id is missing from the context!'
}

export function getCannotEditPollThatIsNotInEditStateErrorMessage(): string {
  return 'A poll that is not in the "edit" state cannot be edited!'
}

export function getCannotVoteInPollIfPollNotInVoteStateErrorMessage(): string {
  return 'Cannot vote in a poll that is not in the "voting" state!'
}
