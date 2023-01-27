import { Phrase } from '../localization/translations'
import { DataClass, PollState } from './graphql-schema-types.generated'

export type Vote = {
  id: string
  optionId: string
  voterId: string | null
  name: string | null
}

export type Option = {
  id: string
  content: string
  dataClass: DataClass
  votes: Vote[]
}

export type Owner = {
  id: string
  name: string
}

export type Poll = {
  id: string
  owner: Owner
  code: string
  question: string
  options: Option[]
  isAnonymous: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
  showStatusWhenVoting: boolean
  state: PollState
  token: string
  createdAt: Date
}

export type TextDateTimeItemsInputConstantsPackage = {
  requiredInfoTextKey: Phrase
  modalTitleKey: Phrase
  placeholderKey: Phrase
  wrong_data_type_error: string
  maxItems: number
  minTextLength: number
  maxTextLength: number
}

export type NumberInputConstantsPackage = {
  titleKey: Phrase
  minimum_value: number
  maximum_value: number
}

export type BooleanInputConstantsPackage = {
  titleKey: Phrase
}

export type WidgetTextPackages = {
  ownerName: TextDateTimeItemsInputConstantsPackage
  votingOptions: TextDateTimeItemsInputConstantsPackage
  question: TextDateTimeItemsInputConstantsPackage
  totalVotesCountMax: NumberInputConstantsPackage
  optionVotesCountMax: NumberInputConstantsPackage
  isAnonymous: BooleanInputConstantsPackage
  showStatusWhenVoting: BooleanInputConstantsPackage
}
