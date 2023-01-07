import { Model, Transaction } from 'objection'
import { v4 as uuidv4 } from 'uuid'
import {
  CreatePollDatabaseInputType,
  PollType,
  FindPollInputType,
  PollState,
  EditPollInputType,
  OptionEditDataType,
  DataClassType
} from '../types/types'
import { ID, nullable, DATE } from '../utils/common-json-schemas'
import {
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from '../utils/constant-values'
import {
  getCannotEditPollThatIsNotInEditStateErrorMessage,
  getFailedEditingPollErrorMessage,
  getFindPollByIdOrCodeRequiresIdOrCodeErrorMessage,
  getPollWithThisIdDoesNotExistErrorMessage,
  getNotAuthenticatedToPerformThisActionErrorMessage
} from '../utils/error-messages'
import { Option } from './option-model'
import { BaseModel } from './base_model'
import { Person } from './person-model'

interface PollOptionsGroupedForUpdate {
  optionsToDeleteIds: string[]
  optionsToPatch: Array<Required<OptionEditDataType>>
  optionsToCreate: OptionEditDataType[]
}
export class Poll extends BaseModel {
  static get tableName(): string {
    return 'Polls'
  }

  id!: string
  code!: string
  ownerId!: string
  question!: string
  isAnonymous!: boolean
  totalVotesCountMax!: number
  optionVotesCountMax!: number
  showStatusWhenVoting!: boolean
  state!: PollState
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date

  static get jsonSchema(): Record<string, string | object> {
    return {
      type: 'object',
      required: [
        'id',
        'code',
        'ownerId',
        'question',
        'isAnonymous',
        'totalVotesCountMax',
        'optionVotesCountMax',
        'showStatusWhenVoting',
        'state'
      ],
      properties: {
        id: ID,
        code: { type: 'string' },
        ownerId: ID,
        question: { type: 'string' },
        isAnonymous: { type: 'boolean' },
        totalVotesCountMax: {
          type: 'integer',
          minimum: TOTAL_VOTES_COUNT_MIN,
          maximum: TOTAL_VOTES_COUNT_MAX
        },
        optionVotesCountMax: {
          type: 'integer',
          minimum: OPTION_VOTES_COUNT_MIN,
          maximum: OPTION_VOTES_COUNT_MAX
        },
        showStatusWhenVoting: { type: 'boolean' },
        state: {
          type: 'string',
          enum: Object.keys(PollState)
        },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt: nullable(DATE)
      }
    }
  }

  static relationMappings = {
    options: {
      relation: Model.HasManyRelation,
      modelClass: Option,
      join: {
        from: 'Polls.id',
        to: 'Options.pollId'
      }
    },
    poll: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'Polls.ownerId',
        to: 'Person.id'
      }
    }
  }

  public static async createPoll(input: CreatePollDatabaseInputType): Promise<PollType> {
    return await this.withinTransaction(async (trx: Transaction): Promise<PollType> => {
      await this.insertOwnerInDatabaseIfNotExist(input.ownerId, input.ownerName, trx)
      const poll = await this.insertPollInDatabase(input, trx)
      await this.insertOptionsInDatabase(input.options, poll.id, input.dataClass, trx)
      return poll
    })
  }

  private static async insertOwnerInDatabaseIfNotExist(
    ownerId: string,
    ownerName: string | null,
    trx: Transaction
  ): Promise<void> {
    const existingOwner = await Person.query(trx).where('id', ownerId).first()
    if (!existingOwner) {
      await Person.query(trx).insert({ id: ownerId, name: ownerName }).returning('*')
    }
  }

  private static async insertPollInDatabase(input: CreatePollDatabaseInputType, trx: Transaction): Promise<PollType> {
    const inputToInsert: Partial<CreatePollDatabaseInputType> = { ...input }
    delete inputToInsert.options
    delete inputToInsert.dataClass
    delete inputToInsert.ownerName
    return await Poll.query(trx).insert(inputToInsert).returning('*')
  }

  private static async insertOptionsInDatabase(
    options: string[],
    pollId: string,
    dataClass: DataClassType,
    trx: Transaction
  ): Promise<void> {
    await Promise.all(
      options.map(async (option) => {
        const optionData = { id: uuidv4(), pollId, content: option, dataClass }
        return await Option.query(trx)
          .insert(optionData)
          .returning('*')
          .then(() => {})
      })
    )
  }

  public static async findPollByIdOrCode(input: FindPollInputType): Promise<PollType> {
    const queryBy = input.id !== undefined ? 'id' : 'code'
    const queryValue = input[queryBy]
    if (!queryValue) throw new Error(getFindPollByIdOrCodeRequiresIdOrCodeErrorMessage())
    const poll = await Poll.query().where(queryBy, queryValue).where('deletedAt', null).returning('*').first()
    if (!poll) throw new Error(getPollWithThisIdDoesNotExistErrorMessage(queryValue))
    return poll
  }

  public static async findPollsByCode(codes: string[]): Promise<PollType[]> {
    const polls = await Poll.query().whereIn('code', codes).where('deletedAt', null).returning('*')
    return polls
  }

  public static async findAllPollsOwnedByOwner(ownerId: string): Promise<PollType[]> {
    return await Poll.query().where('ownerId', ownerId).where('deletedAt', null).returning('*')
  }

  public static async getPollCountInDatabase(): Promise<number> {
    return (await Poll.query().where('deletedAt', null).returning('id')).length
  }

  private static async verifyIsAuthenticatedAsPollOwner(pollId: string, personId?: string): Promise<void> {
    const poll: { ownerId: string } | undefined = await Poll.query().where('id', pollId).returning('ownerId').first()
    if (!personId || personId !== poll?.ownerId) {
      throw new Error(getNotAuthenticatedToPerformThisActionErrorMessage())
    }
  }

  public static async openPoll(pollId: string, personId?: string): Promise<PollType> {
    await this.verifyIsAuthenticatedAsPollOwner(pollId, personId)
    return (await Poll.query().patch({ state: PollState.VOTE }).where('id', pollId).returning('*'))[0]
  }

  public static async closePoll(pollId: string, personId?: string): Promise<PollType> {
    await this.verifyIsAuthenticatedAsPollOwner(pollId, personId)
    return (await Poll.query().patch({ state: PollState.CLOSED }).where('id', pollId).returning('*'))[0]
  }

  public static async deletePoll(pollId: string, personId?: string): Promise<PollType> {
    await this.verifyIsAuthenticatedAsPollOwner(pollId, personId)
    return (await Poll.query().delete().where('id', pollId).returning('*'))[0]
  }

  public static async editPoll(input: EditPollInputType, personId?: string): Promise<PollType> {
    return await this.withinTransaction(async (trx: Transaction): Promise<PollType> => {
      const pollToBeEdited = await this.findPollByIdWithOptions(input.pollId, trx)
      if (!personId || personId !== pollToBeEdited.ownerId) {
        throw new Error(getNotAuthenticatedToPerformThisActionErrorMessage())
      }
      await this.updateOptionsDataInDatabase(pollToBeEdited, input.options, input.dataClass, trx)
      return await this.patchPollInDatabase(input, trx)
    })
  }

  private static async findPollByIdWithOptions(
    pollId: string,
    trx: Transaction
  ): Promise<PollType & { options: OptionEditDataType[] }> {
    const poll = await Poll.query(trx).where('id', pollId).withGraphFetched({ options: true }).first()
    if (!poll) throw new Error(getPollWithThisIdDoesNotExistErrorMessage(pollId))
    if (poll.state !== PollState.EDIT) throw new Error(getCannotEditPollThatIsNotInEditStateErrorMessage())
    return poll as unknown as PollType & { options: OptionEditDataType[] }
  }

  private static async updateOptionsDataInDatabase(
    pollWithOptions: unknown,
    newOptions: OptionEditDataType[] | undefined,
    dataClass: DataClassType | undefined,
    trx: Transaction
  ): Promise<void> {
    const poll = pollWithOptions as PollType & { options: Option[] }
    const { optionsToDeleteIds, optionsToPatch, optionsToCreate } = await this.groupPollOptionsForUpdating(
      poll,
      newOptions
    )
    await Promise.all([
      await Option.query(trx).delete().whereIn('id', optionsToDeleteIds),
      optionsToPatch.map(async (optionToPatch) => {
        return await Option.query(trx).patch({ content: optionToPatch.content }).where('id', optionToPatch.optionId)
      }),
      optionsToCreate.map(async (option) => {
        const dataToInsert = { id: uuidv4(), pollId: poll.id, content: option.content, dataClass }
        return await Option.query(trx).insert(dataToInsert)
      })
    ])
  }

  private static async patchPollInDatabase(input: EditPollInputType, trx: Transaction): Promise<Poll> {
    const pollPatch = this.preparePollPatchFromInputData(input)
    const pollPatchIsEmpty = Object.keys(pollPatch).length === 0
    const poll = pollPatchIsEmpty
      ? await Poll.query(trx).where('id', input.pollId).returning('*').first()
      : await Poll.query(trx).patch(pollPatch).where('id', input.pollId).returning('*').first()
    if (!poll) throw new Error(getFailedEditingPollErrorMessage(input.pollId))
    return poll
  }

  private static preparePollPatchFromInputData(input: EditPollInputType): Partial<EditPollInputType> {
    const pollPatch: Partial<EditPollInputType> = { ...input }
    delete pollPatch.pollId
    if (pollPatch.options) delete pollPatch.options
    if (pollPatch.dataClass) delete pollPatch.dataClass
    return pollPatch
  }

  private static async groupPollOptionsForUpdating(
    poll: unknown,
    options: OptionEditDataType[] | undefined
  ): Promise<PollOptionsGroupedForUpdate> {
    const oldPollOptions = (poll as { options: Option[] }).options
    const newOptions = options ?? []
    const inputOptionIds = newOptions.filter((option) => option.optionId).map((option) => option.optionId)
    const optionsToDeleteIds = oldPollOptions
      .filter((oldOption) => !inputOptionIds.includes(oldOption.id))
      .map((option) => option.id)
    const optionsToPatch = newOptions.filter((option) => option.optionId) as Array<Required<OptionEditDataType>>
    const optionsToCreate = newOptions.filter((option) => !option.optionId)
    return {
      optionsToDeleteIds,
      optionsToPatch,
      optionsToCreate
    }
  }
}
