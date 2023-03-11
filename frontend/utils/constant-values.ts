import { TextPackages } from '../types/types'
import { NAME_DATA_TYPE_ERROR, QUESTION_DATA_TYPE_ERROR, VOTING_OPTION_DATA_TYPE_ERROR } from './error-messages'

export const LOCAL_STORAGE_NAMES_AND_IDS_KEY = 'dots_user_names_and_uuids'
export const LOCAL_STORAGE_POLL_CODES = 'dots_poll_codes'
export const LOCAL_STORAGE_USER_NAME = 'dots_user_name'
export const LOCAL_STORAGE_TOKEN = 'dots_token'
export const LOCAL_STORAGE_USER_ID = 'dots_user_id'
export const POLL_CODE_LENGTH = 9

export const DOT_SIZE = 18
export const DOT_SIZE_SMALL = 12
export const DOT_COLORS = [
  '#0a9396',
  '#9bc400',
  '#F7882F',
  '#3bceac',
  '#DE3163',
  '#7C4793',
  '#08C3DC',
  '#e1b382',
  '#e75874',
  '#0ead69',
  '#beef00',
  '#8076a3',
  '#2E8C05',
  '#ED6214',
  '#c37d92',
  '#846267',
  '#f9c5bd',
  '#a4243b',
  '#6B7A8F',
  '#c2edda'
]

export const TEXT_LENGTH_ORGANIZER_MIN = 3
export const TEXT_LENGTH_QUESTION_MIN = 3
export const TEXT_LENGTH_OPTION_MIN = 1
export const TEXT_LENGTH_MAX = 34
export const VOTING_OPTIONS_MIN = 2
export const VOTING_OPTIONS_MAX = 6
export const OPTIONS_COUNT_MIN = 1
export const OPTIONS_COUNT_MAX = 3

export const PACKAGES: TextPackages = {
  ownerName: {
    requiredInfoTextKey: 'set_your_name',
    modalTitleKey: 'set_your_name_modal_title',
    placeholderKey: 'placeholder_type_name_here',
    wrong_data_type_error: NAME_DATA_TYPE_ERROR,
    maxItems: VOTING_OPTIONS_MAX,
    minTextLength: TEXT_LENGTH_ORGANIZER_MIN,
    maxTextLength: TEXT_LENGTH_MAX
  },
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
  },
  totalVotesCountMax: {
    titleKey: 'max_votes_per_person_title',
    minimum_value: OPTIONS_COUNT_MIN,
    maximum_value: OPTIONS_COUNT_MAX
  },
  optionVotesCountMax: {
    titleKey: 'mox_votes_per_option_title',
    minimum_value: OPTIONS_COUNT_MIN,
    maximum_value: OPTIONS_COUNT_MAX
  },
  isAnonymous: {
    titleKey: 'voting_is_anonymous'
  },
  showStatusWhenVoting: {
    titleKey: 'show_status_when_voting'
  }
}
