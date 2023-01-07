import { DataClassType } from '../types/types'

export function getMaxVotesPerOptionAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this option. Allowed max per option (${maxCount}) already given.`
}

export function getMaxVotesPerPollAlreadyGivenErrorMessage(maxCount: number): string {
  return `Cannot vote this option. Allowed total max (${maxCount}) already given.`
}

export function getPollInputFieldValueNotInRangeErrorMessage(
  fieldName: string,
  minValue: number,
  maxValue: number
): string {
  return `${fieldName} in poll input must be in range ${minValue} ... ${maxValue}`
}

export function getOptionsMustBeUniqueErrorMessage(options: unknown[]): string {
  return `Poll options must be unique. This is not true for option set ${JSON.stringify(options)}`
}

export function getFindPollByIdOrCodeRequiresIdOrCodeErrorMessage(): string {
  return 'Find poll by ID or CODE needs either the ID or the CODE!'
}

export function getOptionIsNotOfSpecifiedDataClassErrorMessage(option: unknown, dataClass: DataClassType): string {
  return `Option ${JSON.stringify(option)} is not a string as specified by the given DataClass ${dataClass}!`
}

export function getDataClassNotImplementedErrorMessage(dataClass: unknown): string {
  return `DataClass ${JSON.stringify(dataClass)} not implemented!`
}

export function getDataClassMustBeProvidedIfOptionsPresentErrorMessage(): string {
  return 'When options are provided, also the DataClass must be specified.'
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

export function getOptionWithThisIdDoesNotExistErrorMessage(optionId: string): string {
  return `Valid option with id ${optionId} does not exist in the database!`
}

export function getPollWithThisIdDoesNotExistErrorMessage(pollId: string): string {
  return `Valid poll with id ${pollId} does not exist in the database!`
}

export function getPersonWithThisIdOrCodeDoesNotExistErrorMessage(personId: string): string {
  return `Person with id  ${personId} could not be found in the database!`
}

export function getSomeOwnerForPollWIthTheseIdsOrCodesMissingErrorMessage(ids: string[], codes: string[]): string {
  return `Owner for some poll in ${ids.toString()} or ${codes.toString()} could not be found in the database!`
}

export function getFailedEditingPollErrorMessage(pollId: string): string {
  return `Failed editing poll with id ${pollId}`
}
