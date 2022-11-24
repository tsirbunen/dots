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
      id: uuidv4(),
      code: createRandomCode(RANDOM_CODE_LENGTH),
      state: PollState.EDIT
    }
    return await Poll.createPoll(databaseInput)
  }

  async findPollByIdOrCode(input: FindPollInputType): Promise<PollType> {
    return await Poll.findPollByIdOrCode(input)
  }

  async findAllPollsForOneOwner(ownerId: string): Promise<PollType[]> {
    return await Poll.findAllPollsForOneOwner(ownerId)
  }

  async editPoll(input: EditPollInputType): Promise<PollType> {
    return await Poll.editPoll(input)
  }

  async openPoll(pollId: string): Promise<boolean> {
    return await Poll.openPoll(pollId)
  }

  async closePoll(pollId: string): Promise<boolean> {
    return await Poll.closePoll(pollId)
  }

  async deletePoll(pollId: string): Promise<boolean> {
    return await Poll.deletePoll(pollId)
  }
}
