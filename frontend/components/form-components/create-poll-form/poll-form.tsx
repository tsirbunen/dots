import { Center } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import BooleanTypeFormInput from '../boolean-type-form-input/boolean-type-form-input'
import NumberTypeFormInput from '../number-type-form-input/number-type-form-input'
import TextDateTimeItemsListFormInput from '../text-date-time-list-form-input/text-date-time-list-form-input'
import TextTypeFormInput from '../text-type-form-input/text-type-input'
import { TextDateTimeDataHolder, TextDateTimeDataType } from './text-date-time-data-holder'
import { yupResolver } from '@hookform/resolvers/yup'
import { createValidationSchema } from './validation'
import { useTranslation } from '../../../hooks/use-translation'
import { TEXT_PACKAGES } from '../../../utils/constant-values'
import { buttonsContainer } from './styles'
import SmallButton from '../../widgets/small-button/small-button'
import { Option, Poll } from '../../../types/types'

export const DATA_CY_RESET = 'reset'
export const DATA_CY_SUBMIT = 'submit'
export const DATA_CY_CREATE_POLL_FORM_CORE = 'create_poll_form_core'

export type PollFormData = {
  ownerName: string
  question: string
  votingOptions: TextDateTimeDataHolder[]
  isAnonymous: boolean
  showStatusWhenVoting: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
}

const convertOptionsToVotingOptions = (options: Option[]) => {
  return options.map((option) => {
    return new TextDateTimeDataHolder(option.content, undefined, undefined, TextDateTimeDataType.PLAIN_TEXT)
  })
}

const getInitialValues = (poll?: Poll, userName?: string | null): PollFormData => {
  return {
    ownerName: userName ?? poll?.owner.name ?? '',
    question: poll?.question ?? '',
    votingOptions: convertOptionsToVotingOptions(poll?.options ?? []),
    isAnonymous: poll?.isAnonymous ?? false,
    showStatusWhenVoting: poll?.showStatusWhenVoting ?? false,
    totalVotesCountMax: poll?.totalVotesCountMax ?? 1,
    optionVotesCountMax: poll?.optionVotesCountMax ?? 1
  }
}

type PollFormProps = {
  mode: 'create' | 'edit'
  onSubmit: SubmitHandler<PollFormData>
  poll: Poll | undefined
  userName: string | undefined
}

const PollForm = ({ mode, poll, onSubmit, userName }: PollFormProps) => {
  const { translate } = useTranslation()

  const { handleSubmit, control, reset, formState, watch } = useForm<PollFormData>({
    mode: 'all',
    defaultValues: getInitialValues(poll, userName),
    resolver: yupResolver(createValidationSchema(translate)),
    shouldFocusError: true
  })

  const totalVotesMaxCount = watch('totalVotesCountMax')
  const optionVotesMaxCount = watch('optionVotesCountMax')
  const isAnonymous = watch('isAnonymous')

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy={DATA_CY_CREATE_POLL_FORM_CORE}>
      {!isAnonymous && (
        <TextTypeFormInput
          control={control}
          textPackage={TEXT_PACKAGES['ownerName']}
          fieldType="ownerName"
          disabled={mode === 'edit' || userName !== undefined}
          value={userName}
        />
      )}
      <TextTypeFormInput control={control} textPackage={TEXT_PACKAGES['question']} fieldType="question" />
      <TextDateTimeItemsListFormInput
        control={control}
        fieldType={'votingOptions'}
        errorMessage={formState.errors.votingOptions?.message}
        textPackage={TEXT_PACKAGES['votingOptions']}
      />
      <BooleanTypeFormInput fieldType="isAnonymous" control={control} textPackage={TEXT_PACKAGES['isAnonymous']} />
      <BooleanTypeFormInput
        fieldType="showStatusWhenVoting"
        control={control}
        textPackage={TEXT_PACKAGES['showStatusWhenVoting']}
      />
      <NumberTypeFormInput
        fieldType="totalVotesCountMax"
        control={control}
        errorMessage={formState.errors.totalVotesCountMax?.message}
        textPackage={TEXT_PACKAGES['totalVotesCountMax']}
        lowerLimit={optionVotesMaxCount}
      />
      <NumberTypeFormInput
        fieldType="optionVotesCountMax"
        control={control}
        errorMessage={formState.errors.optionVotesCountMax?.message}
        textPackage={TEXT_PACKAGES['optionVotesCountMax']}
        upperLimit={totalVotesMaxCount}
      />

      <Center {...buttonsContainer}>
        {mode === 'create' && (
          <SmallButton
            text={translate('general_reset')}
            type="button"
            dataCyPostfix={DATA_CY_RESET}
            onClick={reset}
            isDisabled={!formState.isDirty}
          />
        )}

        <SmallButton
          text={mode === 'create' ? translate('general_submit') : translate('edit_poll_save_changes')}
          type="submit"
          dataCyPostfix={DATA_CY_SUBMIT}
          isDisabled={formState.isSubmitting || !formState.isDirty || Object.keys(formState.errors).length > 0}
        />
      </Center>
    </form>
  )
}

export default PollForm
