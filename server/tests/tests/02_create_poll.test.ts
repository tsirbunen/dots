import 'reflect-metadata'
import 'mocha'
import dns from 'dns'
import { expect, assert } from 'chai'
import { POLL_INPUT_VALID, POLL_INPUT_INVALID } from '../data/polls-data'
import { assertPollsArePracticallyEqual, assertObjectIsAPoll, assertPollContainsAToken } from '../utils/assertions'
import { v4 as uuidv4 } from 'uuid'

import { createPollInDatabase } from '../utils/operations'
import { clearDatabase, closeDatabaseConnection, getDatabaseConnection } from '../utils/handle-database-connections'
import {
  OPTION_COUNT_MAX,
  OPTION_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from '../../utils/constant-values'
import { getOptionsMustBeUniqueErrorMessage } from '../../utils/error-messages'
import { PollValidationFieldEnum } from '../../types/types'
import {
  getErrorMessageFromResponse,
  getOptionsWithInvalidCounts,
  verifyValueNotInExpectedRangeErrorMessage
} from '../utils/helpers'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getDatabaseConnection()

describe('CREATE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('New polls can be created if valid data is given as input', async () => {
    for (let i = 0; i < POLL_INPUT_VALID.length; i++) {
      const pollInputData = { ...POLL_INPUT_VALID[i], ownerId: uuidv4() }
      const createdPoll = await createPollInDatabase(pollInputData)
      assertObjectIsAPoll(createdPoll)
      assertPollsArePracticallyEqual(pollInputData, createdPoll)
      assertPollContainsAToken(createdPoll)
    }
  })

  it('Creating new poll fails if given max total votes count is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_VALID[0], ownerId: '' }
    const invalidTotalVotesCounts = [TOTAL_VOTES_COUNT_MIN - 1, TOTAL_VOTES_COUNT_MAX + 1]
    for (let invalidCount of invalidTotalVotesCounts) {
      pollInputData.totalVotesCountMax = invalidCount
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        verifyValueNotInExpectedRangeErrorMessage(error, PollValidationFieldEnum.TOTAL_VOTES_COUNT)
      }
    }
  })

  it('Creating new poll fails if given max option votes count is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_VALID[0], ownerId: '' }
    const invalidOptionVotesCounts = [OPTION_VOTES_COUNT_MIN - 1, OPTION_VOTES_COUNT_MAX + 1]
    for (let invalidCount of invalidOptionVotesCounts) {
      pollInputData.optionVotesCountMax = invalidCount
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        verifyValueNotInExpectedRangeErrorMessage(error, PollValidationFieldEnum.OPTION_VOTES_COUNT)
      }
    }
  })

  it('Creating new polls fails if given number of options is out of acceptable range', async () => {
    const pollInputData = { ...POLL_INPUT_VALID[0], ownerId: '' }
    const invalidOptionsInputs = getOptionsWithInvalidCounts()

    for (let invalidOptionsInput of invalidOptionsInputs) {
      pollInputData.options = invalidOptionsInput
      pollInputData.ownerId = uuidv4()
      try {
        await createPollInDatabase(pollInputData)
      } catch (error) {
        verifyValueNotInExpectedRangeErrorMessage(error, PollValidationFieldEnum.OPTIONS_COUNT)
      }
    }
  })

  it('Creating a new poll fails if options are not unique', async () => {
    const pollInput = { ...POLL_INPUT_VALID[0], ownerId: uuidv4() }
    const notUnique = 'Not unique'
    pollInput.options = [notUnique, notUnique, 'unique']
    assert(OPTION_COUNT_MIN < pollInput.options.length && pollInput.options.length < OPTION_COUNT_MAX)
    try {
      await createPollInDatabase(pollInput)
    } catch (error) {
      const errorMessage = getErrorMessageFromResponse(error)
      expect(errorMessage).to.equal(getOptionsMustBeUniqueErrorMessage(pollInput.options))
    }
  })

  it('Creating new poll fails if data is missing', async () => {
    for (let i = 0; i < POLL_INPUT_INVALID.length; i++) {
      const invalidInput = { ...POLL_INPUT_INVALID[i].data, ownerId: uuidv4() }
      try {
        await createPollInDatabase(invalidInput)
      } catch (error) {
        const errorMessage = getErrorMessageFromResponse(error)
        assert.include(errorMessage, POLL_INPUT_INVALID[i].missingField)
      }
    }
  })

  after(async () => {
    await closeDatabaseConnection(DATABASE)
  })
})
