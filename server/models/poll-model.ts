/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Transaction } from 'objection'
import { v4 as uuidv4 } from 'uuid'
import {
  CreatePollDatabaseInputType,
  PollType,
  FindPollInputType,
  PollState,
  EditPollInputType,
  CustomError,
  AnswerEditDataType,
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
  getFindPollByIdOrCodeRequiresIdOrCode,
  getValidOwnerWithThisIdOrCodeDoesNotExistErrorMessage,
  getValidPollWithThisIdDoesNotExistErrorMessage
} from '../utils/error-messages'
import { Answer } from './answer-model'
import { BaseModel } from './base_model'
import { Owner } from './owner-model'

interface PollAnswersGroupedForUpdate {
  answersToDeleteIds: string[]
  answersToPatch: Array<Required<AnswerEditDataType>>
  answersToCreate: AnswerEditDataType[]
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
    answers: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: 'Polls.id',
        to: 'Answers.pollId'
      }
    },
    poll: {
      relation: Model.BelongsToOneRelation,
      modelClass: Owner,
      join: {
        from: 'Polls.ownerId',
        to: 'Owners.id'
      }
    }
  }

  public static async createPoll(input: CreatePollDatabaseInputType): Promise<PollType> {
    return await this.performWithinTransaction(async (trx: Transaction): Promise<PollType> => {
      await this.createOwnerIfDoesNotExist(input.ownerId, input.ownerName, trx)
      const createdPoll = await this.createPollInDatabase(input, trx)
      await this.createPollAnswersForNewPoll(input.answers, createdPoll.id, input.dataClass, trx)
      return createdPoll
    })
  }

  public static async findPollByIdOrCode(input: FindPollInputType): Promise<PollType | CustomError> {
    const queryBy = input.id !== undefined ? 'id' : 'code'
    const queryValue = input[queryBy]
    if (queryValue === undefined) return { errorMessage: getFindPollByIdOrCodeRequiresIdOrCode() }
    const poll = await Poll.query().where(queryBy, queryValue).where('deletedAt', null).returning('*').first()
    if (!poll) return { errorMessage: getValidOwnerWithThisIdOrCodeDoesNotExistErrorMessage(queryValue) }
    return poll
  }

  public static async findAllPollsForOneOwner(ownerId: string): Promise<PollType[]> {
    return await Poll.query().where('ownerId', ownerId).where('deletedAt', null).returning('*')
  }

  public static async editPoll(input: EditPollInputType): Promise<PollType | CustomError> {
    return await this.performWithinTransaction(async (trx: Transaction): Promise<PollType | CustomError> => {
      const pollToBeEdited = await this.findPollByIdWithAnswersForEditing(input.pollId, trx)
      if ((pollToBeEdited as CustomError).errorMessage) return pollToBeEdited
      await this.updateAnswersDataInDatabase(pollToBeEdited, input.answers, input.dataClass, trx)
      return await this.patchPollInDatabase(input, trx)
    })
  }

  public static async openPoll(pollId: string): Promise<boolean> {
    await Poll.query().patch({ state: PollState.VOTE }).where('id', pollId)
    return true
  }

  public static async closePoll(pollId: string): Promise<boolean> {
    await Poll.query().patch({ state: PollState.CLOSED }).where('id', pollId)
    return true
  }

  public static async deletePoll(pollId: string): Promise<boolean> {
    await Poll.query().delete().where('id', pollId)
    return true
  }

  private static async createOwnerIfDoesNotExist(ownerId: string, ownerName: string, trx: Transaction): Promise<void> {
    const existingOwner = await Owner.query(trx).where('id', ownerId).first()
    if (!existingOwner) {
      await Owner.query(trx).insert({ id: ownerId, name: ownerName }).returning('*')
    }
  }

  private static async createPollInDatabase(input: CreatePollDatabaseInputType, trx: Transaction): Promise<PollType> {
    const inputToInsert: Partial<CreatePollDatabaseInputType> = { ...input }
    delete inputToInsert.answers
    delete inputToInsert.dataClass
    delete inputToInsert.ownerName
    return await Poll.query(trx).insert(inputToInsert).returning('*')
  }

  private static async createPollAnswersForNewPoll(
    answers: string[],
    pollId: string,
    dataClass: DataClassType,
    trx: Transaction
  ): Promise<void> {
    await Promise.all(
      answers.map(async (answer) => {
        const answerDataToInsert = { id: uuidv4(), pollId, content: answer, dataClass }
        return await Answer.query(trx).insert(answerDataToInsert).returning('*')
      })
    )
  }

  private static async findPollByIdWithAnswersForEditing(
    pollId: string,
    trx: Transaction
  ): Promise<(PollType & { answers: AnswerEditDataType[] }) | CustomError> {
    const poll = await Poll.query(trx).where('id', pollId).withGraphFetched({ answers: true }).first()
    if (!poll) return { errorMessage: getValidPollWithThisIdDoesNotExistErrorMessage(pollId) }
    if (poll.state !== PollState.EDIT) {
      return { errorMessage: getCannotEditPollThatIsNotInEditStateErrorMessage() }
    }
    return poll as unknown as PollType & { answers: AnswerEditDataType[] }
  }

  private static async updateAnswersDataInDatabase(
    poll: unknown,
    newAnswers: AnswerEditDataType[] | undefined,
    dataClass: DataClassType | undefined,
    trx: Transaction
  ): Promise<void> {
    const pollWithAnswers = poll as PollType & { answers: Answer[] }
    const { answersToDeleteIds, answersToPatch, answersToCreate } = await this.groupPollAnswersForUpdating(
      pollWithAnswers,
      newAnswers
    )

    await Promise.all([
      answersToDeleteIds.map(async (oldAnswerId) => await Answer.query(trx).delete().where('id', oldAnswerId)),
      answersToPatch.map(async (answerToPatch) => {
        return await Answer.query(trx).patch({ content: answerToPatch.content }).where('id', answerToPatch.answerId)
      }),
      answersToCreate.map(async (answer) => {
        const dataToInsert = { id: uuidv4(), pollId: pollWithAnswers.id, content: answer.content, dataClass }
        return await Answer.query(trx).insert(dataToInsert)
      })
    ])
  }

  private static async patchPollInDatabase(input: EditPollInputType, trx: Transaction): Promise<Poll | CustomError> {
    const pollPatch = this.preparePollPatchFromInputData(input)
    const pollPatchIsEmpty = Object.keys(pollPatch).length === 0
    const poll = pollPatchIsEmpty
      ? await Poll.query(trx).where('id', input.pollId).returning('*').first()
      : await Poll.query(trx).patch(pollPatch).where('id', input.pollId).returning('*').first()
    if (!poll) return { errorMessage: getFailedEditingPollErrorMessage(input.pollId) }
    return poll
  }

  private static preparePollPatchFromInputData(input: EditPollInputType): Partial<EditPollInputType> {
    const pollPatch: Partial<EditPollInputType> = { ...input }
    delete pollPatch.pollId
    if (pollPatch.answers) delete pollPatch.answers
    if (pollPatch.dataClass) delete pollPatch.dataClass
    return pollPatch
  }

  private static async groupPollAnswersForUpdating(
    poll: unknown,
    answers: AnswerEditDataType[] | undefined
  ): Promise<PollAnswersGroupedForUpdate> {
    const oldPollAnswers = (poll as { answers: Answer[] }).answers
    const newAnswers = answers ?? []
    const inputAnswerIds = newAnswers.filter((answer) => answer.answerId).map((answer) => answer.answerId)
    const answersToDeleteIds = oldPollAnswers
      .filter((oldAnswer) => !inputAnswerIds.includes(oldAnswer.id))
      .map((answer) => answer.id)
    const answersToPatch = newAnswers.filter((answer) => answer.answerId) as Array<Required<AnswerEditDataType>>
    const answersToCreate = newAnswers.filter((answer) => !answer.answerId)
    return {
      answersToDeleteIds,
      answersToPatch,
      answersToCreate
    }
  }
}
