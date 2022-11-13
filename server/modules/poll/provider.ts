import { v4 as uuidv4 } from 'uuid'
import { Injectable } from 'graphql-modules'

import { Poll } from '../../models/poll-model'
import { createRandomCode } from '../../utils/create-random-code'
import { CreatePollDatabaseInputType, CreatePollInputType, FindPollInputType, PollType } from '../../types/types'

const RANDOM_CODE_LENGTH = 9

@Injectable()
export class PollProvider {
  async createPoll(input: CreatePollInputType): Promise<PollType> {
    const databaseInput: CreatePollDatabaseInputType = {
      ...input,
      id: uuidv4(),
      code: createRandomCode(RANDOM_CODE_LENGTH)
    }
    return await Poll.createPoll(databaseInput)
  }

  async findPollByIdOrCode(input: FindPollInputType): Promise<Omit<PollType, 'answers'>> {
    return await Poll.findPollByIdOrCode(input)
  }
}
