import { v4 as uuidv4 } from 'uuid'
import { Injectable } from 'graphql-modules'

import { Poll } from '../../models/poll-model'
import { createRandomCode } from '../../utils/create-random-code'
import {
  CreatePollDatabaseInputType,
  CreatePollInputType,
  EditPollInputType,
  FindPollInputType,
  PollState,
  PollType
} from '../../types/types'
import { RANDOM_CODE_LENGTH } from '../../utils/constant-values'

@Injectable()
export class PollProvider {
  async createPoll(input: CreatePollInputType): Promise<PollType> {
    const databaseInput: CreatePollDatabaseInputType = {
      ...input,
      ownerName: input.ownerName ? input.ownerName : null,
      id: uuidv4(),
      code: createRandomCode(RANDOM_CODE_LENGTH),
      state: PollState.EDIT
    }
    return await Poll.createPoll(databaseInput)
  }

  async findPollByIdOrCode(input: FindPollInputType): Promise<PollType> {
    return await Poll.findPollByIdOrCode(input)
  }

  async findPollsByCode(codes: string[]): Promise<PollType[]> {
    return await Poll.findPollsByCode(codes)
  }

  async findAllPollsOwnedByOwner(ownerId: string): Promise<PollType[]> {
    return await Poll.findAllPollsOwnedByOwner(ownerId)
  }

  async getPollCountInDatabase(): Promise<number> {
    return await Poll.getPollCountInDatabase()
  }

  async editPoll(input: EditPollInputType, personId?: string): Promise<PollType> {
    return await Poll.editPoll(input, personId)
  }

  async openPoll(pollId: string, personId?: string): Promise<PollType> {
    return await Poll.openPoll(pollId, personId)
  }

  async closePoll(pollId: string, personId?: string): Promise<PollType> {
    return await Poll.closePoll(pollId, personId)
  }

  async deletePoll(pollId: string, personId?: string): Promise<PollType> {
    return await Poll.deletePoll(pollId, personId)
  }
}
