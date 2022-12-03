import { Phrase } from '../localization/translations'
import { QUESTION_DATA_TYPE_ERROR, VOTING_OPTION_DATA_TYPE_ERROR } from './error-messages'

export const DOT_SIZE = 18
export const DOT_SIZE_SMALL = 12
export const DOT_COLORS = [
  '#c37d92',
  '#846267',
  '#ee4266',
  '#ffd23f',
  '#3bceac',
  '#0ead69',
  '#a4243b',
  '#0a9396',
  '#d8c99b',
  '#d8973c',
  '#bd632f',
  '#273e47',
  '#ff595e'
]

export const TEXT_LENGTH_QUESTION_MIN = 3
export const TEXT_LENGTH_OPTION_MIN = 1
export const TEXT_LENGTH_MAX = 34
export const VOTING_OPTIONS_MIN = 2
export const VOTING_OPTIONS_MAX = 6

export type TextDateTimeItemsInputConstantsPackage = {
  requiredInfoTextKey: Phrase
  modalTitleKey: Phrase
  placeholderKey: Phrase
  wrong_data_type_error: string
  maxItems: number
  minTextLength: number
  maxTextLength: number
}

type TextPackagesType = 'votingOptions' | 'question'

export const TEXT_KEY_PACKAGES: Record<TextPackagesType, TextDateTimeItemsInputConstantsPackage> = {
  votingOptions: {
    requiredInfoTextKey: 'set_min_voting_options',
    modalTitleKey: 'add_voting_option_modal_title',
    placeholderKey: 'placeholder_type_option_here',
    wrong_data_type_error: VOTING_OPTION_DATA_TYPE_ERROR,
    maxItems: VOTING_OPTIONS_MAX,
    minTextLength: TEXT_LENGTH_OPTION_MIN,
    maxTextLength: TEXT_LENGTH_MAX
  },
  question: {
    requiredInfoTextKey: 'set_voting_question',
    modalTitleKey: 'add_voting_question_modal_title',
    placeholderKey: 'placeholder_type_question_here',
    wrong_data_type_error: QUESTION_DATA_TYPE_ERROR,
    maxItems: 1,
    minTextLength: TEXT_LENGTH_QUESTION_MIN,
    maxTextLength: TEXT_LENGTH_MAX
  }
}

export type NumberInputConstantsPackage = {
  titleKey: Phrase
  minimum_value: number
  maximum_value: number
}

type NumberInputConstantsPackageName = 'maxTotal' | 'maxPerOption'

export const NUMBER_KEY_PACKAGES: Record<NumberInputConstantsPackageName, NumberInputConstantsPackage> = {
  maxTotal: {
    titleKey: 'max_votes_per_person_title',
    minimum_value: 1,
    maximum_value: 3
  },
  maxPerOption: {
    titleKey: 'mox_votes_per_option_title',
    minimum_value: 1,
    maximum_value: 3
  }
}

export type BooleanInputConstantsPackage = {
  titleKey: Phrase
}

type BooleanInputConstantsPackageName = 'isAnonymous' | 'showStatus'

export const BOOLEAN_KEY_PACKAGES: Record<BooleanInputConstantsPackageName, BooleanInputConstantsPackage> = {
  isAnonymous: {
    titleKey: 'voting_is_anonymous'
  },
  showStatus: {
    titleKey: 'show_status_when_voting'
  }
}
