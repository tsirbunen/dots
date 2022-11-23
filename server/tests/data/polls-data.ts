import { DataClassType } from '../../types/types'
import {
  getDataClassMustBeProvidedIfAnswersPresentErrorMessage,
  getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage,
  getSomeInputValueMustBeGivenForEditingPollErrorMessage
} from '../../utils/error-messages'

export const POLL_INPUT_DATA = [
  {
    ownerName: 'Eric Cartman',
    question: 'What kind of food should we order?',
    answers: ['Chinese', 'Sushi', 'Mexican', 'Nepalese'],
    dataClass: DataClassType.TEXT,
    isAnonymous: false,
    totalVotesCountMax: 1,
    optionVotesCountMax: 1,
    showStatusWhenVoting: true
  },
  {
    ownerName: 'Darth Vader',
    question: 'How many days should we stay on holiday?',
    answers: ['7', '10', '14'],
    dataClass: DataClassType.NUMBER,
    isAnonymous: true,
    totalVotesCountMax: 2,
    optionVotesCountMax: 1,
    showStatusWhenVoting: true
  },
  {
    ownerName: 'Harry Potter',
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

export const EDIT_POLL_INPUT_VALID_DATA = [
  {
    pollId: 'to be set',
    question: 'Edited question',
    answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
    isAnonymous: false,
    dataClass: DataClassType.TEXT,
    totalVotesCountMax: 2,
    optionVotesCountMax: 2,
    showStatusWhenVoting: true
  },
  {
    pollId: 'to be set',
    answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
    isAnonymous: false,
    dataClass: DataClassType.TEXT,
    totalVotesCountMax: 2,
    optionVotesCountMax: 2,
    showStatusWhenVoting: true
  },
  {
    pollId: 'to be set',
    answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
    isAnonymous: false,
    dataClass: DataClassType.TEXT,
    totalVotesCountMax: 2,
    optionVotesCountMax: 2
  },
  {
    pollId: 'to be set',
    answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
    isAnonymous: false,
    dataClass: DataClassType.TEXT
  },
  {
    pollId: 'to be set',
    answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
    dataClass: DataClassType.TEXT
  },
  {
    pollId: 'to be set',
    totalVotesCountMax: 2,
    optionVotesCountMax: 2,
    showStatusWhenVoting: true
  },
  {
    pollId: 'to be set',
    showStatusWhenVoting: true
  }
]

export const EDIT_POLL_INPUT_INVALID_DATA = [
  {
    data: {
      pollId: 'to be set',
      question: 'Edited question',
      answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
      isAnonymous: false,
      totalVotesCountMax: 2,
      optionVotesCountMax: 2,
      showStatusWhenVoting: true
    },
    errorMessage: getDataClassMustBeProvidedIfAnswersPresentErrorMessage()
  },
  {
    data: {
      pollId: 'to be set',
      question: 'Edited question',
      answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
      isAnonymous: false,
      dataClass: DataClassType.TEXT,
      optionVotesCountMax: 2,
      showStatusWhenVoting: true
    },
    errorMessage: getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage()
  },
  {
    data: {
      pollId: 'to be set',
      question: 'Edited question',
      answers: [{ content: 'Op. A' }, { content: 'Op. B' }, { content: 'Op. C' }, { content: 'Op. D' }],
      isAnonymous: false,
      dataClass: DataClassType.TEXT,
      totalVotesCountMax: 2,
      showStatusWhenVoting: true
    },
    errorMessage: getOptionAndTotalVotesMaximaMustBothBePresentIfOnePresentErrorMessage()
  },
  {
    data: {
      pollId: 'to be set'
    },
    errorMessage: getSomeInputValueMustBeGivenForEditingPollErrorMessage()
  }
]

export const POLL_INPUT_INVALID_DATA = [
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      answers: ['7', '10', '14'],
      isAnonymous: true,
      totalVotesCountMax: 2,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true
    },
    missingField: 'dataClass'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      answers: ['7', '10', '14'],
      dataClass: DataClassType.NUMBER,
      isAnonymous: true,
      totalVotesCountMax: 2,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true
    },
    missingField: 'question'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      dataClass: DataClassType.NUMBER,
      isAnonymous: true,
      totalVotesCountMax: 2,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true
    },
    missingField: 'answers'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      answers: ['7', '10', '14'],
      dataClass: DataClassType.NUMBER,
      totalVotesCountMax: 2,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true
    },
    missingField: 'isAnonymous'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      answers: ['7', '10', '14'],
      dataClass: DataClassType.NUMBER,
      isAnonymous: true,
      optionVotesCountMax: 1,
      showStatusWhenVoting: true
    },
    missingField: 'totalVotesCountMax'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      answers: ['7', '10', '14'],
      dataClass: DataClassType.NUMBER,
      isAnonymous: true,
      totalVotesCountMax: 2,
      showStatusWhenVoting: true
    },
    missingField: 'optionVotesCountMax'
  },
  {
    data: {
      ownerName: 'Darth Vader',
      question: 'How many days should we stay on holiday?',
      answers: ['7', '10', '14'],
      dataClass: DataClassType.NUMBER,
      isAnonymous: true,
      totalVotesCountMax: 2,
      optionVotesCountMax: 1
    },
    missingField: 'showStatusWhenVoting'
  }
]
