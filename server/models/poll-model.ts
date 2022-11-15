import { Model, Transaction } from 'objection'
import { v4 as uuidv4 } from 'uuid'
import { CreatePollDatabaseInputType, PollType, FindPollInputType, PollState, EditPollInputType } from '../types/types'
import { ID, nullable, DATE } from '../utils/common-json-schemas'
import {
  OPTION_VOTES_COUNT_MAX,
  OPTION_VOTES_COUNT_MIN,
  TOTAL_VOTES_COUNT_MAX,
  TOTAL_VOTES_COUNT_MIN
} from '../utils/constant-values'
import { getFindPollBytIdOrCodeRequiresIdOrCode } from '../utils/error-messages'
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
      await Owner.query(trx).insert({ id: input.ownerId, name: input.ownerName }).returning('*')
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

  public static async editPoll(input: EditPollInputType): Promise<PollType> {
    return await this.performWithinTransaction(async (trx: Transaction): Promise<PollType> => {
      if (input.answers !== undefined) {
        const allOldPollAnswers = await Poll.query(trx).where('id', input.pollId).withGraphFetched({ answers: true })
        const oldPollAnswerIds = new Set()
        allOldPollAnswers.forEach((pollAnswer) => oldPollAnswerIds.add(pollAnswer.id))
        input.answers.forEach((inputAnswer) => {
          const answerId = inputAnswer.answerId
          if (answerId !== undefined && oldPollAnswerIds.has(answerId)) {
            oldPollAnswerIds.delete(answerId)
          }
        })

        await Promise.all([
          Object.values(oldPollAnswerIds).map(async (oldAnswerId) => {
            await Answer.query().delete().where('id', oldAnswerId)
          }),
          input.answers.map(async (answer) => {
            const answerId = answer.answerId
            if (answerId === undefined) {
              await Answer.query(trx).insert({
                id: uuidv4(),
                pollId: input.pollId,
                content: answer.content,
                dataClass: input.dataClass
              })
            } else {
              // TODO: No need to patch if not changed. FIX THIS!
              await Answer.query().patch({ content: answer.content }).where('id', answerId)
            }
          })
        ])
      }
      const pollPatch: Partial<EditPollInputType> = input
      delete pollPatch.pollId
      if (pollPatch.answers !== undefined) delete pollPatch.answers

      const patchedPoll = await Poll.query(trx).patch(pollPatch).where('id', input.pollId).returning('*')
      return patchedPoll[0]
    })
  }

  public static async openPoll(pollId: string): Promise<boolean> {
    await Poll.query().patch({ state: PollState.VOTE }).where('id', pollId)
    return true
  }
}
