import 'reflect-metadata'
import 'mocha'
import dns from 'dns'
import { assert } from 'chai'
import { POLL_VALID, POLL_INVALID } from '../data/polls-data'
import { assertPollsAreEqual, assertObjectIsAPoll, assertPollContainsAToken } from '../utils/assertions'
import { v4 as uuidv4 } from 'uuid'
import { createPoll } from '../utils/operations'
import { clearDatabase, closeConnection, getConnection } from '../utils/handle-database-connections'
import {
  OPTION_COUNT_MAX,
  OPTION_COUNT_MIN,
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from '../../utils/constant-values'
import { extractErrorMessage, getOptionsWithInvalidCounts } from '../utils/helpers'
import { getValidationErrorMessages, ModelClass } from '../../utils/common-json-schemas'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()

describe('CREATE POLL', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
  })

  it('New polls can be created if valid data is given as input', async () => {
    for (let i = 0; i < POLL_VALID.length; i++) {
      const input = { ...POLL_VALID[i], ownerId: uuidv4() }
      const createdPoll = await createPoll(input)
      assertObjectIsAPoll(createdPoll)
      assertPollsAreEqual(input, createdPoll)
      assertPollContainsAToken(createdPoll)
    }
  })

  it('Creating new poll fails if given max total votes count is out of acceptable range', async () => {
    const input = { ...POLL_VALID[0], ownerId: '' }
    const invalidTotalVotesCounts = [TOTAL_VOTES_COUNT_MIN - 1, TOTAL_VOTES_COUNT_MAX + 1]
    for (let invalidCount of invalidTotalVotesCounts) {
      input.totalVotesCountMax = invalidCount
      input.ownerId = uuidv4()
      try {
        await createPoll(input)
      } catch (error) {
        const expected = getValidationErrorMessages(ModelClass.POLLS).totalVotesCountMax
        const received = extractErrorMessage(error)
        assert.include(received, expected)
      }
    }
  })

  it('Creating new poll fails if given max option votes count is out of acceptable range', async () => {
    const pollInputData = { ...POLL_VALID[0], ownerId: '' }
    const invalidOptionVotesCounts = [OPTION_VOTES_COUNT_MIN - 1, OPTION_VOTES_COUNT_MAX + 1]
    for (let invalidCount of invalidOptionVotesCounts) {
      pollInputData.optionVotesCountMax = invalidCount
      pollInputData.ownerId = uuidv4()
      try {
        await createPoll(pollInputData)
      } catch (error) {
        const expected = getValidationErrorMessages(ModelClass.POLLS).optionVotesCountMax
        const received = extractErrorMessage(error)
        assert.include(received, expected)
      }
    }
  })

  it('Creating new polls fails if given number of options is out of acceptable range', async () => {
    const pollInputData = { ...POLL_VALID[0], ownerId: '' }
    const invalidOptionsInputs = getOptionsWithInvalidCounts()

    for (let invalidOptionsInput of invalidOptionsInputs) {
      pollInputData.options = invalidOptionsInput
      pollInputData.ownerId = uuidv4()
      try {
        await createPoll(pollInputData)
      } catch (error) {
        const expected = getValidationErrorMessages(ModelClass.POLLS).options
        const received = extractErrorMessage(error)
        assert.include(received, expected)
      }
    }
  })

  it('Creating a new poll fails if options are not unique', async () => {
    const pollInput = { ...POLL_VALID[0], ownerId: uuidv4() }
    const notUnique = 'Not unique'
    pollInput.options = [notUnique, notUnique, 'unique']
    assert(OPTION_COUNT_MIN < pollInput.options.length && pollInput.options.length < OPTION_COUNT_MAX)
    try {
      await createPoll(pollInput)
    } catch (error) {
      const expected = getValidationErrorMessages(ModelClass.POLLS).options
      const received = extractErrorMessage(error)
      assert.include(received, expected)
    }
  })

  it('Creating new poll fails if data is missing', async () => {
    for (let i = 0; i < POLL_INVALID.length; i++) {
      const invalidInput = { ...POLL_INVALID[i].data, ownerId: uuidv4() }
      try {
        await createPoll(invalidInput)
      } catch (error) {
        const errorMessage = extractErrorMessage(error)
        assert.include(errorMessage, POLL_INVALID[i].missingField)
      }
    }
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
