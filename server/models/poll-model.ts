/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Transaction } from 'objection'
import { v4 as uuidv4 } from 'uuid'
import {
  CreatePollDatabaseInputType,
  PollType,
  FindPollInputType,
  PollState,
  EditPollInputType,
  CustomError
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
  getFindPollBytIdOrCodeRequiresIdOrCode
} from '../utils/error-messages'
import { Answer } from './answer-model'
import { BaseModel } from './base_model'
import { Owner } from './owner-model'

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
      const existingOwners = await Owner.query(trx).where('id', input.ownerId)
      if (existingOwners.length === 0) {
        await Owner.query(trx).insert({ id: input.ownerId, name: input.ownerName }).returning('*')
      }
      const answers = input.answers
      const dataClass = input.dataClass
      const cleanedInput: Partial<CreatePollDatabaseInputType> = input
      delete cleanedInput.answers
      delete cleanedInput.dataClass
      delete cleanedInput.ownerName
      const createdPoll = await Poll.query(trx).insert(cleanedInput).returning('*')
      await Promise.all(
        answers.map(async (answer) => {
          const a = await Answer.query(trx)
            .insert({
              id: uuidv4(),
              pollId: createdPoll.id,
              content: answer,
              dataClass
            })
            .returning('*')
          return a
        })
      )
      return createdPoll
    })
  }

  public static async findPollByIdOrCode(input: FindPollInputType): Promise<PollType> {
    const queryBy = input.id !== undefined ? 'id' : 'code'
    const queryValue = input[queryBy]
    if (queryValue === undefined) throw new Error(getFindPollBytIdOrCodeRequiresIdOrCode())
    const polls = await Poll.query().where(queryBy, queryValue).where('deletedAt', null).returning('*')
    return polls[0]
  }

  public static async findAllPollsForOneOwner(ownerId: string): Promise<PollType[]> {
    const polls = await Poll.query().where('ownerId', ownerId).where('deletedAt', null).returning('*')
    return polls
  }

  public static async editPoll(input: EditPollInputType): Promise<PollType | CustomError> {
    return await this.performWithinTransaction(async (trx: Transaction): Promise<PollType | CustomError> => {
      const oldPolls = await Poll.query(trx).where('id', input.pollId).withGraphFetched({ answers: true })
      if (oldPolls[0].state !== PollState.EDIT) {
        return { errorMessage: getCannotEditPollThatIsNotInEditStateErrorMessage() }
      }
      let oldPollAnswers: Answer[] = []
      if (input.answers !== undefined) {
        const oldPolls = await Poll.query(trx).where('id', input.pollId).withGraphFetched({ answers: true })
        oldPollAnswers = (oldPolls[0] as unknown as { answers: Answer[] }).answers
      }
      const inputAnswers = input.answers ?? []
      const inputAnswerIds = inputAnswers
        .filter((answer) => answer.answerId !== undefined)
        .map((answer) => answer.answerId)
      const oldAnswersToDeleteIds = oldPollAnswers
        .filter((oldAnswer) => !inputAnswerIds.includes(oldAnswer.id))
        .map((answer) => answer.id)
      const answersToPatch = inputAnswers.filter((answer) => answer.answerId !== undefined) as Array<{
        answerId: string
        content: string
      }>
      const newAnswersToCreate = inputAnswers.filter((answer) => answer.answerId === undefined)

      const pollPatch: Partial<EditPollInputType> = { ...input }
      delete pollPatch.pollId
      if (pollPatch.answers !== undefined) delete pollPatch.answers
      if (pollPatch.dataClass !== undefined) delete pollPatch.dataClass
      const patchIsEmpty = Object.keys(pollPatch).length === 0

      const [_deletedOldAnswers, _patchedAnswers, _createdNewAnswers, patchedPolls] = await Promise.all([
        oldAnswersToDeleteIds.map(async (oldAnswerId) => await Answer.query(trx).delete().where('id', oldAnswerId)),
        answersToPatch.map(async (answerToPatch) => {
          return await Answer.query(trx).patch({ content: answerToPatch.content }).where('id', answerToPatch.answerId)
        }),
        newAnswersToCreate.map(async (answer) => {
          return await Answer.query(trx).insert({
            id: uuidv4(),
            pollId: input.pollId,
            content: answer.content,
            dataClass: input.dataClass
          })
        }),
        patchIsEmpty
          ? await Poll.query(trx).where('id', input.pollId).returning('*')
          : await Poll.query(trx).patch(pollPatch).where('id', input.pollId).returning('*')
      ])

      return patchedPolls[0]
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
    // TODO: Tarkista, katoaako muista tauluista on cascade data!!!
    await Poll.query().delete().where('id', pollId)
    return true
  }
}
