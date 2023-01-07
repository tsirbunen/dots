import {
  CreatePollInputType,
  EditPollInputType,
  PollValidationFieldEnum,
  POLL_INPUT_FIELDS_VALIDATION_DATA,
  keyOfCreateOrEditPollInputType,
  DataClassType
} from '../types/types'
import {
  getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage,
  getPollInputFieldValueNotInRangeErrorMessage,
  getDataClassMustBeProvidedIfOptionsPresentErrorMessage,
  getOptionsMustBeUniqueErrorMessage,
  getOptionIsNotOfSpecifiedDataClassErrorMessage,
  getDataClassNotImplementedErrorMessage,
  getSomeInputValueMustBeGivenForEditingPollErrorMessage
} from './error-messages'

export function verifyTotalAndOptionMaximaBothPresentIfOnePresent(
  input: CreatePollInputType | EditPollInputType
): void {
  if (
    (input.totalVotesCountMax !== undefined && input.optionVotesCountMax === undefined) ||
    (input.totalVotesCountMax === undefined && input.optionVotesCountMax !== undefined)
  ) {
    throw new Error(getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage())
  }
}

export function verifyNumbersAndCountsInRequiredRangesIfPresent(input: CreatePollInputType | EditPollInputType): void {
  Object.values(PollValidationFieldEnum).forEach((validationField) => {
    verifyFieldValueIsInRequiredRangeIfPresent(input, validationField)
  })
}

export function verifyFieldValueIsInRequiredRangeIfPresent(
  input: CreatePollInputType | EditPollInputType,
  field: PollValidationFieldEnum
): void {
  const validationData = POLL_INPUT_FIELDS_VALIDATION_DATA[field]
  const fieldValue = input[validationData.key as keyOfCreateOrEditPollInputType]
  if (fieldValue === undefined) return
  let count
  if (typeof fieldValue === 'number') {
    count = fieldValue
  } else if (Array.isArray(fieldValue)) {
    count = fieldValue.length
  }
  if (count === undefined || count < validationData.min || count > validationData.max) {
    throw new Error(
      getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
    )
  }
}

export function verifyDataClassSpecifiedIfOptionsGiven(input: CreatePollInputType | EditPollInputType): void {
  if (input.options && !input.dataClass) {
    throw new Error(getDataClassMustBeProvidedIfOptionsPresentErrorMessage())
  }
}

export function verifyOptionsAreUniqueIfPresent(input: CreatePollInputType | EditPollInputType): void {
  if (input.options === undefined) return
  const optionsSet = new Set()
  input.options.forEach((option) => optionsSet.add(option))
  if (input.options.length > optionsSet.size) {
    throw new Error(getOptionsMustBeUniqueErrorMessage(input.options))
  }
}

export function verifyAllOptionContentsAreOfSpecifiedDataClassIfPresent(
  input: CreatePollInputType | EditPollInputType
): void {
  const { options, dataClass } = input
  if (!options) return
  if (!dataClass) return
  options.forEach((option) => {
    const content = typeof option === 'object' ? option.content : option
    const errorMessage = getOptionIsNotOfSpecifiedDataClassErrorMessage(option, dataClass)
    if (!option || content.length === 0) {
      throw new Error(errorMessage)
    }
    switch (dataClass) {
      case DataClassType.TEXT:
        if (typeof content !== 'string') throw new Error(errorMessage)
        break
      case DataClassType.NUMBER:
        if (typeof parseInt(content, 10) !== 'number') throw new Error(errorMessage)
        break
      case DataClassType.DATE:
        if (!(new Date(content as unknown as number) instanceof Date)) throw new Error(errorMessage)
        break
      default:
        throw new Error(getDataClassNotImplementedErrorMessage(dataClass))
    }
  })
}

export function verifyInputContainsAtLeastSomeFieldForEditing(input: CreatePollInputType | EditPollInputType): void {
  const someFieldsInEditPollInput = ['question', 'options', 'isAnonymous', 'totalVotesCountMax', 'showStatusWhenVoting']
  const someFieldIsPresent = Object.keys(input).some((key) => someFieldsInEditPollInput.includes(key))
  if (!someFieldIsPresent) {
    throw new Error(getSomeInputValueMustBeGivenForEditingPollErrorMessage())
  }
}
