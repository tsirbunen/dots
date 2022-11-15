import 'reflect-metadata'
import 'mocha'
import dns from 'dns'
import { expect } from 'chai'
import { POLL_INPUT_DATA } from '../data/polls-data'
import {
  assertPollFieldsArePracticallySameWhenPresent,
  assertObjectIsAPoll,
  assertReturnedCreatedPollContainsAToken
} from '../utils/assertions'
import { v4 as uuidv4 } from 'uuid'

import { createPollInDatabase } from '../utils/operations'
import { clearDatabase, closeDatabaseConnection, getDatabaseConnection } from '../utils/handle-database'
import {
  OPTION_COUNT_MAX,
  OPTION_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from '../../utils/constant-values'
import {
  getPollAnswerOptionsMustBeUniqueErrorMessage,
  getPollInputFieldValueNotInRangeErrorMessage
} from '../../utils/error-messages'
import {
  PollInputFieldValidationDataType,
  PollValidationFieldEnum,
  POLL_INPUT_FIELDS_VALIDATION_DATA
} from '../../types/types'
import { assert } from 'console'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('CREATE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('A new poll can be created if proper input data is used in creating the poll', async () => {
    for (let i = 0; i < POLL_INPUT_DATA.length; i++) {
      const pollInputData = { ...POLL_INPUT_DATA[i], ownerId: uuidv4() }
      const createdPoll = await createPollInDatabase(pollInputData)
      assertObjectIsAPoll(createdPoll, false)
      assertPollFieldsArePracticallySameWhenPresent(pollInputData, createdPoll)
      assertReturnedCreatedPollContainsAToken(createdPoll)
    }
  })

  it('Creating new poll fails if given max total votes count is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: '' }
    const invalidTotalVotesCounts = [TOTAL_VOTES_COUNT_MIN - 1, TOTAL_VOTES_COUNT_MAX + 1]
    for (let invalidTotalVotesCount of invalidTotalVotesCounts) {
      pollInputData.totalVotesCountMax = invalidTotalVotesCount
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        const errorResponse = error as { response: { errors: { message: string }[] } }
        const errorMessage = errorResponse.response.errors[0].message
        const validationData: PollInputFieldValidationDataType =
          POLL_INPUT_FIELDS_VALIDATION_DATA[PollValidationFieldEnum.TOTAL_VOTES_COUNT]
        expect(errorMessage).to.equal(
          getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
        )
      }
    }
  })

  it('Creating new poll fails if given max option votes count is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: '' }
    const invalidOptionVotesCounts = [OPTION_VOTES_COUNT_MIN - 1, OPTION_VOTES_COUNT_MAX + 1]
    for (let invalidOptionVotesCount of invalidOptionVotesCounts) {
      pollInputData.optionVotesCountMax = invalidOptionVotesCount
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        const errorResponse = error as { response: { errors: { message: string }[] } }
        const errorMessage = errorResponse.response.errors[0].message
        const validationData: PollInputFieldValidationDataType =
          POLL_INPUT_FIELDS_VALIDATION_DATA[PollValidationFieldEnum.OPTION_VOTES_COUNT]
        expect(errorMessage).to.equal(
          getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
        )
      }
    }
  })

  it('Creating new poll fails if given number of answers is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: '' }
    const oneTooFewAnswerOptions = []
    for (let i = 0; i < OPTION_COUNT_MIN - 1; i++) {
      oneTooFewAnswerOptions.push(`Answer option ${i}`)
    }
    const oneTooManyAnswerOptions = []
    for (let i = 0; i < OPTION_COUNT_MAX + 1; i++) {
      oneTooManyAnswerOptions.push(`Answer option ${i}`)
    }
    const invalidAnswerOptionsInputs = [oneTooFewAnswerOptions, oneTooManyAnswerOptions]
    invalidAnswerOptionsInputs.forEach((answerOptionsList) =>
      assert(answerOptionsList.length < OPTION_COUNT_MIN || answerOptionsList.length > OPTION_COUNT_MAX)
    )

    for (let invalidAnswerOptionsInput of invalidAnswerOptionsInputs) {
      pollInputData.answers = invalidAnswerOptionsInput
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        const errorResponse = error as { response: { errors: { message: string }[] } }
        const errorMessage = errorResponse.response.errors[0].message
        const validationData: PollInputFieldValidationDataType =
          POLL_INPUT_FIELDS_VALIDATION_DATA[PollValidationFieldEnum.ANSWERS_COUNT]
        expect(errorMessage).to.equal(
          getPollInputFieldValueNotInRangeErrorMessage(validationData.title, validationData.min, validationData.max)
        )
      }
    }
  })

  it('Creating new poll fails if all answer options are not unique', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: uuidv4() }
    const notUnique = 'Not unique'
    pollInputData.answers = [notUnique, notUnique, 'unique']
    assert(OPTION_COUNT_MIN < pollInputData.answers.length && pollInputData.answers.length < OPTION_COUNT_MAX)
    try {
      await createPollInDatabase(pollInputData)
    } catch (error) {
      const errorResponse = error as { response: { errors: { message: string }[] } }
      const errorMessage = errorResponse.response.errors[0].message
      expect(errorMessage).to.equal(getPollAnswerOptionsMustBeUniqueErrorMessage(pollInputData.answers))
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
