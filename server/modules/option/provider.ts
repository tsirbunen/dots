import { Injectable } from 'graphql-modules'
import { v4 as uuidv4 } from 'uuid'
import { Option } from '../../models/option/option-model'
import { OptionDB } from '../../models/option/types'
import { VoteDB, VoteDBMinimal, VoteDBPartial } from '../../models/vote/types'

@Injectable()
export class OptionProvider {
  async giveAVoteToOption(input: VoteDBMinimal): Promise<VoteDB> {
    const inputToDatabase: VoteDBPartial = {
      ...input,
      id: uuidv4()
    }
    if (!input.name) {
      inputToDatabase.name = null
    }

    return await Option.giveAVoteToOption(inputToDatabase)
  }

  async findOptionsByPollId(pollId: string): Promise<OptionDB[]> {
    return await Option.findOptionsByPollId(pollId)
  }
}
