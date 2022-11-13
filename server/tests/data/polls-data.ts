import { DataClassType } from '../../types/types'

export const POLL_INPUT_DATA = [
  {
    question: 'What kind of food should we order?',
    answers: ['Chinese', 'Sushi', 'Mexican', 'Nepalese'],
    dataClass: DataClassType.TEXT,
    isAnonymous: false,
    totalVotesCountMax: 1,
    optionVotesCountMax: 1,
    showStatusWhenVoting: true
  },
  {
    question: 'How many days should we stay on holiday?',
    answers: ['7', '10', '14'],
    dataClass: DataClassType.NUMBER,
    isAnonymous: true,
    totalVotesCountMax: 2,
    optionVotesCountMax: 1,
    showStatusWhenVoting: true
  },
  {
    question: 'When should we have the party?',
    answers: [
      new Date('2022-11-01').valueOf().toString(),
      new Date('2022-11-10').valueOf().toString(),
      new Date('2022-11-12').valueOf().toString(),
      new Date('2022-11-28').valueOf().toString(),
      new Date('2022-12-05').valueOf().toString()
    ],
    dataClass: DataClassType.DATE,
    isAnonymous: true,
    totalVotesCountMax: 3,
    optionVotesCountMax: 2,
    showStatusWhenVoting: false
  }
]
