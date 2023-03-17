import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Errors } from '../../utils/errors'
import { BaseModel } from '../base/base_model'
import { Person } from '../person/person-model'
import { Vote } from '../vote/vote-model'
import { insertOptionSchema, updateOptionSchema } from './validation-schemas'
import { DataClass, PollState } from '../../types/graphql-schema-types.generated'
import { Poll } from '../poll/poll-model'
import { VoteDB, VoteDBPartial } from '../vote/types'
import { GroupedOptions, OptionDB, OptionEditData, OptionVoter } from './types'
import { PARTICIPANTS_COUNT_MAX } from '../../utils/constant-values'
import { OptionInEditing, PollDB } from '../poll/types'

export class Option extends BaseModel {
  static get tableName(): string {
    return 'Options'
  }

  public static async giveAVoteToOption(input: VoteDBPartial): Promise<VoteDB> {
    const poll = await Poll.findPollByOptionId(input.optionId)
    if (poll.state !== PollState.Vote) throw new Error(Errors.pollNotInVoteState)
    const optionVoters = await Poll.findPollVoters(poll.id)
    this.verifyCanVote(poll, input.optionId, input.voterId, optionVoters)

    return await this.withinTransaction(async (trx: Knex.Transaction): Promise<VoteDB> => {
      await Person.insertOrUpdatePerson(input.voterId, input.name ?? null, trx)
      const inputToDatabase = { id: input.id, optionId: input.optionId, voterId: input.voterId, name: input.name }
      const insertedVote = await Vote.insertVote(inputToDatabase, trx)

      return insertedVote
    })
  }

  public static async findOptionsByPollId(pollId: string): Promise<OptionDB[]> {
    return await this.database<OptionDB>('Options').where('pollId', pollId).where('deletedAt', null).returning('*')
  }

  public static async insertOptions(
    options: string[],
    pollId: string,
    dataClass: DataClass,
    trx: Knex.Transaction
  ): Promise<void> {
    await Promise.all(
      options.map(async (option) => {
        const optionData = { id: uuidv4(), pollId, content: option, dataClass }
        this.validate(insertOptionSchema, optionData)
        return await this.database<OptionDB>('Options')
          .transacting(trx)
          .insert(optionData)
          .returning('*')
          .then(() => {})
      })
    )
  }

  public static async updateOptions(
    optionsToEdit: OptionInEditing[],
    newOptions: OptionEditData[] | undefined,
    dataClass: DataClass | undefined,
    pollId: string,
    trx: Knex.Transaction
  ): Promise<void> {
    const { toDeleteIds, toPatch, toCreate } = await this.groupOptions(optionsToEdit, newOptions)
    await Promise.all([
      await this.database<OptionDB>('Options').transacting(trx).delete().whereIn('id', toDeleteIds),
      toPatch.map(async (toPatch) => {
        this.validate(updateOptionSchema, toPatch)
        return await this.database<OptionDB>('Options')
          .transacting(trx)
          .where('id', toPatch.optionId)
          .update({ content: toPatch.content })
      }),
      toCreate.map(async (option) => {
        const dataToInsert = { id: uuidv4(), pollId, content: option.content, dataClass }
        this.validate(insertOptionSchema, dataToInsert)
        return await this.database<OptionDB>('Options').transacting(trx).insert(dataToInsert)
      })
    ])
  }

  private static async groupOptions(
    oldOptions: OptionInEditing[],
    options?: OptionEditData[]
  ): Promise<GroupedOptions> {
    const updatedOptions = options ?? []
    const inputOptionIds = updatedOptions.filter((option) => option.optionId).map((option) => option.optionId)
    const toDeleteIds = oldOptions
      .filter((oldOption) => !inputOptionIds.includes(oldOption.id))
      .map((option) => option.id)

    return {
      toDeleteIds,
      toPatch: updatedOptions.filter((option) => option.optionId) as Array<Required<OptionEditData>>,
      toCreate: updatedOptions.filter((option) => !option.optionId)
    }
  }

  private static verifyCanVote(poll: PollDB, optionId: string, voterId: string, givenVotes: OptionVoter[]): void {
    const voters = new Set()
    let votesByVoterThisOption = 0
    let votesTotal = 0
    givenVotes.forEach((givenVote) => {
      voters.add(givenVote.voterId)
      if (givenVote.voterId === voterId) {
        votesTotal += 1
        if (givenVote.id === optionId) {
          votesByVoterThisOption += 1
        }
      }
    })

    if (voters.size >= PARTICIPANTS_COUNT_MAX && votesTotal === 0) throw new Error(Errors.maxParticipantsReached)

    if (votesByVoterThisOption >= poll.optionVotesCountMax) {
      throw new Error(Errors.maxVotesPerOptionAlready(poll.optionVotesCountMax))
    }
    if (votesTotal >= poll.totalVotesCountMax) {
      throw new Error(Errors.maxVotesPerPollAlreadyGiven(poll.totalVotesCountMax))
    }
  }
}
