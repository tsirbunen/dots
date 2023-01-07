import { Injectable } from 'graphql-modules'
import { v4 as uuidv4 } from 'uuid'

import { Option } from '../../models/option-model'
import { VoteInputType, VoteType, OptionType } from '../../types/types'

@Injectable()
export class OptionProvider {
  async giveAVoteToOption(input: VoteInputType): Promise<VoteType> {
    const inputToDatabase = {
      ...input,
      id: uuidv4()
    }
    if (!input.name) {
      inputToDatabase.name = null
    }
    return await Option.giveAVoteToOption(inputToDatabase)
  }

  async findOptionsByPollId(pollId: string): Promise<OptionType[]> {
    return await Option.findOptionsByPollId(pollId)
  }
}
