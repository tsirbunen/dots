import 'reflect-metadata'
import 'mocha'
import { v4 as uuidv4 } from 'uuid'
import dns from 'dns'
import { POLL_VALID } from '../data/polls-data'
import { createPoll, findPollsByCode, giveAVoteToOption, openPollForVoting } from '../utils/operations'
import { assertTokenIsMissing, assertTokenIsPresent } from '../utils/assertions'
import { getConnection, clearDatabase, closeConnection } from '../utils/handle-database-connections'
import { assert } from 'chai'
import { PollFull } from '../../models/poll/types'

dns.setDefaultResultOrder('ipv4first')

const DATABASE = getConnection()
let codes: string[]
let ownerAId: string
let ownerBId: string
let tokenA: string | undefined
let tokenB: string | undefined
let pollsOwnerA: PollFull[]

describe('POLL FULL DATA', () => {
  beforeEach(async () => {
    await clearDatabase(DATABASE)
    codes = []
    ownerAId = uuidv4()
    ownerBId = uuidv4()
    pollsOwnerA = []
    tokenA = undefined
    tokenB = undefined
    for (let i = 0; i < 2; i++) {
      const pollA = await createPoll({ ...POLL_VALID[i], ownerId: ownerAId })
      pollsOwnerA.push(pollA)
      codes.push(pollA.code)
      if (i === 0) tokenA = pollA.token
    }
    const pollB = await createPoll({ ...POLL_VALID[2], ownerId: ownerBId })
    codes.push(pollB.code)
    tokenB = pollB.token
  })

  it('Person can get polls by codes and only those owned by him contain tokens', async () => {
    const pollsA = await findPollsByCode(tokenA!, codes)
    pollsA.forEach((poll) => {
      if (poll.owner.id === ownerAId) assertTokenIsPresent(poll)
      else assertTokenIsMissing(poll)
    })

    const pollsB = await findPollsByCode(tokenB!, codes)
    pollsB.forEach((poll) => {
      if (poll.owner.id === ownerBId) assertTokenIsPresent(poll)
      else assertTokenIsMissing(poll)
    })
  })

  it('Votes contain voterId only when voterId is persons personId', async () => {
    const poll = pollsOwnerA[0]
    await openPollForVoting(poll.id, poll.token!)
    const selectedOptionId = poll.options[0].id
    const voterIds = [ownerAId, ownerBId]
    for (let i = 0; i < voterIds.length; i++) {
      let voteInput = {
        optionId: selectedOptionId,
        voterId: voterIds[i]
      }
      await giveAVoteToOption(voteInput)
    }

    const pollAWithVotes = (await findPollsByCode(tokenA!, [poll.code]))[0]
    pollAWithVotes.options.forEach((option) => {
      if (option.id === selectedOptionId) {
        assert(option.votes.length === 2)
        option.votes.some((vote) => vote.voterId !== null && vote.voterId === ownerAId)
        const onlyVoterAVoteHasVoterData =
          (option.votes[0].voterId !== null && option.votes[1].voterId === null) ||
          (option.votes[1].voterId !== null && option.votes[0].voterId === null)
        assert(onlyVoterAVoteHasVoterData)
      } else {
        assert(option.votes.length === 0)
      }
    })

    const pollBWithVotes = (await findPollsByCode(tokenB!, [poll.code]))[0]
    pollBWithVotes.options.forEach((option) => {
      if (option.id === selectedOptionId) {
        assert(option.votes.length === 2)
        option.votes.some((vote) => vote.voterId !== null && vote.voterId === ownerBId)
        const onlyVoterBVoteHasVoterData =
          (option.votes[0].voterId !== null && option.votes[1].voterId === null) ||
          (option.votes[1].voterId !== null && option.votes[0].voterId === null)
        assert(onlyVoterBVoteHasVoterData)
      } else {
        assert(option.votes.length === 0)
      }
    })
  })

  after(async () => {
    await closeConnection(DATABASE)
  })
})
