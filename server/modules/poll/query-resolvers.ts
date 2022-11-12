import { Context } from '../../Context'
import { PollType } from './mutation-resolvers'

interface PollQueryResolversType {
  poll: (_parent: unknown, code: string, _context: Context) => Promise<PollType | null>
}

export const PollQueryResolvers: PollQueryResolversType = {
  poll: async (_parent, code, _context) => {
    console.log('code', code)
    return {
      id: 'id',
      code: 'code',
      question: 'What kind of food should we order?',
      answers: [
        { id: '3', pollId: '3', content: 'Chinese' },
        { id: '5', pollId: 'rr', content: 'Sushi' },
        { id: '6', pollId: 'tt', content: 'Mexican' }
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
