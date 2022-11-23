import 'reflect-metadata'
import 'mocha'
import dns from 'dns'
import { expect, assert } from 'chai'
import { POLL_INPUT_DATA, POLL_INPUT_INVALID_DATA } from '../data/polls-data'
import {
  assertPollFieldsArePracticallyEqualWhenPresent,
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
import { getPollAnswerOptionsMustBeUniqueErrorMessage } from '../../utils/error-messages'
import { PollValidationFieldEnum } from '../../types/types'
import {
  getErrorMessageFromResponse,
  getAnswerOptionsWithInvalidCountsForCreatePoll,
  handleCheckingPollFieldValueNotInRangeExpectedErrorMessage
} from '../utils/helpers'

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
      assertObjectIsAPoll(createdPoll)
      assertPollFieldsArePracticallyEqualWhenPresent(pollInputData, createdPoll)
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
        handleCheckingPollFieldValueNotInRangeExpectedErrorMessage(error, PollValidationFieldEnum.TOTAL_VOTES_COUNT)
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
        handleCheckingPollFieldValueNotInRangeExpectedErrorMessage(error, PollValidationFieldEnum.OPTION_VOTES_COUNT)
      }
    }
  })

  it('Creating new poll fails if given number of answers is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_DATA[0], ownerId: '' }
    const invalidAnswerOptionsInputs = getAnswerOptionsWithInvalidCountsForCreatePoll()

    for (let invalidAnswerOptionsInput of invalidAnswerOptionsInputs) {
      pollInputData.answers = invalidAnswerOptionsInput
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        handleCheckingPollFieldValueNotInRangeExpectedErrorMessage(error, PollValidationFieldEnum.ANSWERS_COUNT)
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
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getPollAnswerOptionsMustBeUniqueErrorMessage(pollInputData.answers))
    }
  })

  it('Creating new poll fails if data is missing', async () => {
    for (let i = 0; i < POLL_INPUT_INVALID_DATA.length; i++) {
      const invalidPollInput = { ...POLL_INPUT_INVALID_DATA[i].data, ownerId: uuidv4() }
      try {
        await createPollInDatabase(invalidPollInput)
      } catch (error) {
        const errorMessage = getErrorMessageFromResponse(error)
        assert.include(errorMessage, POLL_INPUT_INVALID_DATA[i].missingField)
      }
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
