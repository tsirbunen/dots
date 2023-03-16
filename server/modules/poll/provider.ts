import { v4 as uuidv4 } from 'uuid'
import { Injectable } from 'graphql-modules'
import { Poll } from '../../models/poll/poll-model'
import { createRandomCode } from '../../utils/create-random-code'
import { RANDOM_CODE_LENGTH } from '../../utils/constant-values'
import { CreatePollInput, PollState, Poll as PollSchema } from '../../types/graphql-schema-types.generated'
import { PollDB, EditPollInputType, CreatePollFullInput } from '../../models/poll/types'
import { getAuthenticatedPerson } from '../../utils/get-authenticated-person'
import { Context } from '../../Context'
import { createJWT } from '../../utils/token-handling'

@Injectable()
export class PollProvider {
  async createPoll(input: CreatePollInput): Promise<PollSchema> {
    const databasePollInput = this.fillInMissingFields(input)
    const poll = await Poll.createPoll(databasePollInput)
    return await this.attachToken(poll.ownerId, poll)
  }

  async findPollByCode(code: string, context: Context): Promise<PollSchema> {
    const poll = await Poll.findPollByCode(code)
    const personId = getAuthenticatedPerson(context)
    if (!personId || personId !== poll.ownerId) return poll
    return await this.attachToken(personId, poll)
  }

  async findPollsByCode(codes: string[], context: Context): Promise<PollSchema[]> {
    const polls = await Poll.findPollsByCode(codes)
    const personId = getAuthenticatedPerson(context)
    if (!personId) return polls
    return await this.attachTokenToOwnedPolls(personId, polls)
  }

  async findAllPollsOwnedByPerson(ownerId: string): Promise<PollSchema[]> {
    return await Poll.findAllPollsOwnedByPerson(ownerId)
  }

  async getPollCountInDatabase(): Promise<number> {
    return await Poll.getPollCountInDatabase()
  }

  async editPoll(input: EditPollInputType, personId: string): Promise<PollSchema> {
    const poll = await Poll.editPoll(input, personId)
    return await this.attachToken(personId, poll)
  }

  async openPoll(pollId: string, personId: string): Promise<PollSchema> {
    const poll = await Poll.openPoll(pollId, personId)
    return await this.attachToken(personId, poll)
  }

  async closePoll(pollId: string, personId: string): Promise<PollSchema> {
    const poll = await Poll.closePoll(pollId, personId)
    return await this.attachToken(personId, poll)
  }

  async deletePoll(pollId: string, personId: string): Promise<PollSchema> {
    const poll = await Poll.deletePoll(pollId, personId)
    return await this.attachToken(personId, poll)
  }

  fillInMissingFields(input: CreatePollInput): CreatePollFullInput {
    return {
      ...input,
      ownerName: input.ownerName ?? null,
      id: uuidv4(),
      code: createRandomCode(RANDOM_CODE_LENGTH),
      state: PollState.Edit
    }
  }

  async attachToken(personId: string, poll: PollDB): Promise<PollSchema> {
    const token = createJWT({ pollId: poll.id, ownerId: personId })
    return { ...poll, token }
  }

  async attachTokenToOwnedPolls(personId: string, polls: PollDB[]): Promise<PollSchema[]> {
    return polls.map((poll) => {
      if (poll.ownerId !== personId) return poll
      const token = createJWT({ pollId: poll.id, ownerId: personId })
      return { ...poll, token }
    })
  }
}
