import { Knex } from 'knex'
import { Errors } from '../../utils/errors'
import { Option } from '../option/option-model'
import { BaseModel } from '../base/base_model'
import { Person } from '../person/person-model'
import { createPollSchema, getEditPollSchema } from './validation-schemas'
import { PollState } from '../../types/graphql-schema-types.generated'
import { CreatePollFullInput, PollDB, EditPollInputType, OptionInEditing } from './types'
import { OptionVoter } from '../option/types'
import { removeFields } from '../../utils/remove-fields'

export class Poll extends BaseModel {
  static get tableName(): string {
    return 'Polls'
  }

  public static async createPoll(input: CreatePollFullInput): Promise<PollDB> {
    this.validate(createPollSchema, input)
    return await this.withinTransaction(async (trx: Knex.Transaction): Promise<PollDB> => {
      await Person.insertOrUpdatePerson(input.ownerId, input.ownerName ?? null, trx)
      const poll = await this.insertPoll(input, trx)
      await Option.insertOptions(input.options, poll.id, input.dataClass, trx)
      return poll
    })
  }

  private static async insertPoll(input: CreatePollFullInput, trx: Knex.Transaction): Promise<PollDB> {
    const inputToInsert = removeFields(input, ['options', 'dataClass', 'ownerName'])
    const polls = await this.database<PollDB>('Polls').transacting(trx).insert(inputToInsert).returning('*')
    if (!polls || polls.length === 0) throw new Error(Errors.failedToInsertPoll(input.id))
    return polls[0]
  }

  public static async findPollByCode(code: string): Promise<PollDB> {
    const polls = await this.database<PollDB>('Polls').where('code', code).where('deletedAt', null).returning('*')
    if (!polls || polls.length === 0) throw new Error(Errors.pollDoesNotExist(code))
    return polls[0]
  }

  public static async findPollsByCode(codes: string[]): Promise<PollDB[]> {
    const polls = await this.database<PollDB>('Polls').whereIn('code', codes).where('deletedAt', null).returning('*')
    return polls
  }

  public static async findAllPollsOwnedByPerson(ownerId: string): Promise<PollDB[]> {
    return await this.database<PollDB>('Polls').where('ownerId', ownerId).where('deletedAt', null).returning('*')
  }

  public static async getPollCountInDatabase(): Promise<number> {
    return (await this.database<PollDB>('Polls').where('deletedAt', null).returning('id')).length
  }

  private static async verifyIsPollOwner(pollId: string, personId?: string): Promise<void> {
    const polls: Array<{ ownerId: string }> | undefined = await this.database<{ ownerId: string }>('Polls')
      .where('id', pollId)
      .returning('ownerId')
    if (!personId || !polls || polls.length === 0 || personId !== polls[0].ownerId) {
      throw new Error(Errors.notAuthorized)
    }
  }

  public static async openPoll(pollId: string, personId?: string): Promise<PollDB> {
    await this.verifyIsPollOwner(pollId, personId)
    const state = PollState.Vote
    return (await this.database<PollDB>('Polls').update({ state }).where('id', pollId).returning('*'))[0]
  }

  public static async closePoll(pollId: string, personId?: string): Promise<PollDB> {
    await this.verifyIsPollOwner(pollId, personId)
    const state = PollState.Closed
    return (await this.database<PollDB>('Polls').update({ state }).where('id', pollId).returning('*'))[0]
  }

  public static async deletePoll(pollId: string, personId?: string): Promise<PollDB> {
    await this.verifyIsPollOwner(pollId, personId)
    return (await this.database<PollDB>('Polls').delete().where('id', pollId).returning('*'))[0]
  }

  public static async editPoll(input: EditPollInputType, personId: string): Promise<PollDB> {
    console.log(input)
    this.validate(getEditPollSchema(input), input)
    return await this.withinTransaction(async (trx: Knex.Transaction): Promise<PollDB> => {
      if (input.options) {
        const optionsToEdit = await this.findOptions(input.pollId, trx)
        if (!personId || personId !== optionsToEdit[0].ownerId) throw new Error(Errors.notAuthorized)
        await Option.updateOptions(optionsToEdit, input.options, input.dataClass, input.pollId, trx)
      }
      if (input.ownerName) {
        console.log('*********************')

        await Person.updatePersonName(personId, input.ownerName, trx)
        console.log('+++++++++++++++++++++')
      }
      return await this.patchPoll(input, trx)
    })
  }

  public static async findPollVoters(pollId: string): Promise<OptionVoter[]> {
    return await this.database
      .table('Options')
      .innerJoin('Votes', 'Options.id', '=', 'Votes.optionId')
      .where('pollId', pollId)
      .select(['Options.id', 'Votes.voterId'])
  }

  public static async findPollByOptionId(optionId: string): Promise<PollDB> {
    const polls = await this.database
      .select('Polls.*')
      .from('Polls')
      .innerJoin('Options', 'Polls.id', '=', 'Options.pollId')
      .where('Options.id', optionId)
    if (!polls || !Array.isArray(polls) || polls.length === 0) {
      throw new Error(Errors.failedToFindPollByOptionId(optionId))
    }
    return polls[0]
  }

  private static async findOptions(pollId: string, trx: Knex.Transaction): Promise<OptionInEditing[]> {
    const pollOptions = await this.database
      .table('Polls')
      .transacting(trx)
      .innerJoin('Options', 'Polls.id', '=', 'Options.pollId')
      .select('*')
      .where('Polls.id', pollId)
    if (!pollOptions || pollOptions.length === 0) throw new Error(Errors.pollDoesNotExist(pollId))
    if ((pollOptions[0] as { state: PollState }).state !== PollState.Edit) throw new Error(Errors.pollNotInEditState)
    return pollOptions as unknown as OptionInEditing[]
  }

  private static async patchPoll(input: EditPollInputType, trx: Knex.Transaction): Promise<PollDB> {
    const pollPatch = removeFields(input, ['pollId', 'options', 'dataClass'])
    const pollPatchIsEmpty = Object.keys(pollPatch).length === 0
    let polls: PollDB[] | undefined
    if (pollPatchIsEmpty) {
      polls = await this.database<PollDB>('Polls').transacting(trx).where('id', input.pollId).returning('*')
    } else {
      polls = await this.database<PollDB>('Polls')
        .transacting(trx)
        .update(pollPatch)
        .where('id', input.pollId)
        .returning('*')
    }
    if (!polls || polls.length === 0) throw new Error(Errors.failedEditingPoll(input.pollId))
    return polls[0]
  }
}
