import { Context } from '../../Context'

interface PollMutationResolversType {
  createPoll: (_parent: unknown, args: { input: CreatePollInputType }, _context: Context) => Promise<PollType>
}

export const PollMutationResolvers: PollMutationResolversType = {
  createPoll: async (_parent, { input }, _context) => {
    return {
      id: '0675ce76-b952-477b-9b73-774001f00002',
      code: 'code',
      question: 'What kind of food should we order?',
      answers: [
        {
          id: '0675ce76-b952-477b-9b73-774001f00002',
          pollId: '0675ce76-b952-477b-9b73-774001f00002',
          content: 'Chinese'
        },
        {
          id: '0675ce76-b952-477b-9b73-774001f00002',
          pollId: '0675ce76-b952-477b-9b73-774001f00002',
          content: 'Sushi'
        },
        {
          id: '0675ce76-b952-477b-9b73-774001f00002',
          pollId: '0675ce76-b952-477b-9b73-774001f00002',
          content: 'Mexican'
        }
      ],
      isAnonymous: false,
      totalVotesCountMax: 1,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

// Niin kauan kunnes saadaan codegen mukaan, tehdään itse tyypit
export interface AnswerType {
  id: string
  pollId: string
  content: string
}
export interface CreatePollInputType {
  question: string
  answers: string[]
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
}

export interface PollType {
  id: string
  code: string
  question: string
  answers: AnswerType[]
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
