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
  getDataClassMustBeProvidedIfAnswersPresentErrorMessage,
  getPollAnswerOptionsMustBeUniqueErrorMessage,
  getAnswerIsNotOfSpecifiedDataClassErrorMessage,
  getDataClassNotImplementedErrorMessage,
  // getAnswerIdMustBeSpecifiedWhenEditingAnswerErrorMessage,
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

export function verifyDataClassSpecifiedIfAnswersGiven(input: CreatePollInputType | EditPollInputType): void {
  if (input.answers !== undefined && input.dataClass === undefined) {
    throw new Error(getDataClassMustBeProvidedIfAnswersPresentErrorMessage())
  }
}

export function verifyAnswerOptionsAreUniqueIfPresent(input: CreatePollInputType | EditPollInputType): void {
  if (input.answers === undefined) return
  const answersSet = new Set()
  input.answers.forEach((answer) => answersSet.add(answer))
  if (input.answers.length > answersSet.size) {
    throw new Error(getPollAnswerOptionsMustBeUniqueErrorMessage(input.answers))
  }
}

export function verifyAllAnswerContentsAreOfSpecifiedDataClassIfPresent(
  input: CreatePollInputType | EditPollInputType
): void {
  const { answers, dataClass } = input
  if (!answers) return
  if (!dataClass) return
  answers.forEach((answer) => {
    const content = typeof answer === 'object' ? answer.content : answer
    const errorMessage = getAnswerIsNotOfSpecifiedDataClassErrorMessage(answer, dataClass)
    if (answer === undefined || answer === null || content.length === 0) {
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
  const someFieldsInEditPollInput = ['question', 'answers', 'isAnonymous', 'totalVotesCountMax', 'showStatusWhenVoting']
  const someFieldIsPresent = Object.keys(input).some((key) => someFieldsInEditPollInput.includes(key))
  if (!someFieldIsPresent) {
    throw new Error(getSomeInputValueMustBeGivenForEditingPollErrorMessage())
  }
}
