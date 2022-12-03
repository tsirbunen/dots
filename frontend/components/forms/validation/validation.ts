import * as Yup from 'yup'
import { Phrase } from '../../../localization/translations'
import {
  TEXT_LENGTH_QUESTION_MIN,
  TEXT_LENGTH_MAX,
  VOTING_OPTIONS_MIN,
  VOTING_OPTIONS_MAX
} from '../../../utils/constant-values'
import { TextDateTimeDataHolder, TextDateTimeDataType } from '../data-models/text-date-time-data-holder'

export const createValidationSchema = (translate: (phrase: Phrase) => string) => {
  return Yup.object().shape({
    question: Yup.string().required().min(TEXT_LENGTH_QUESTION_MIN).max(TEXT_LENGTH_MAX),
    votingOptions: Yup.array()
      .test('options-are-unique', translate('options_must_be_unique'), (value, _context) => {
        const optionsSet = new Set()
        const options: string[] = (value as TextDateTimeDataHolder[]).map((item) => item.data)
        options.forEach((option) => optionsSet.add(option))
        if (optionsSet.size !== (value ?? []).length) return false
        return true
      })
      .required()
      .min(VOTING_OPTIONS_MIN, translate('too_little_options'))
      .max(VOTING_OPTIONS_MAX, translate('too_many_options')),
    isAnonymous: Yup.bool().required(),
    showStatus: Yup.bool().required(),
    maxTotal: Yup.number().required().min(1).max(3),
    maxPerOption: Yup.number().required().min(1).max(3)
  })
}

export const modalInputValidationSchema = (
  translate: (phrase: Phrase) => string,
  dataType: TextDateTimeDataType,
  textMinLength: number,
  textMaxLength: number
) => {
  if (dataType === TextDateTimeDataType.PLAIN_TEXT) {
    const stringSchema = Yup.string()
      .required(translate('required'))
      .min(textMinLength, translate('too_short'))
      .max(textMaxLength, translate('too_long'))
    return Yup.object().shape({
      textInput: stringSchema
    })
  } else {
    // TODO: Implement this!
    return Yup.object().shape({
      date: Yup.string(),
      time: Yup.string()
    })
  }
}
