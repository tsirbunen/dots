import { useForm, SubmitHandler } from 'react-hook-form'
import BooleanInput from '../form-inputs/boolean-input'
import NumberInput from '../form-inputs/number-input'
import TextListInput from '../form-inputs/text-list-input'
import TextInput from '../form-inputs/text-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { createValidationSchema } from './validation'
import { useTranslation } from '../../../hooks/use-translation'
import { PACKAGES } from '../../../utils/constant-values'
import { Option, Poll } from '../../../types/types'
import { ActionButtons, FormMode } from './action-buttons'

export const DATA_CY_RESET = 'reset'
export const DATA_CY_SUBMIT = 'submit'
export const DATA_CY_POLL_FORM_CORE = 'poll_form_core'

export type PollFormData = {
  ownerName: string
  question: string
  votingOptions: string[]
  isAnonymous: boolean
  showStatusWhenVoting: boolean
  totalVotesCountMax: number
  optionVotesCountMax: number
}

export type PollFormProps = {
  mode: FormMode
  onSubmit: SubmitHandler<PollFormData>
  poll: Poll | undefined
  userName: string | undefined
}

/**
 * This component is the common "core" of poll forms that is used both when
 * user wants to either create a new poll or to edit an existing poll.
 */
export const PollForm = ({ mode, poll, onSubmit, userName }: PollFormProps) => {
  const { translate } = useTranslation()

  const convertOptionsToVotingOptions = (options: Option[]) => {
    return options.map((option) => {
      return option.content
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
    <form onSubmit={handleSubmit(onSubmit)} data-cy={DATA_CY_POLL_FORM_CORE}>
      {!isAnonymous && (
        <TextInput
          control={control}
          textPackage={PACKAGES['ownerName']}
          fieldType="ownerName"
          disabled={mode === FormMode.EDIT || userName !== undefined}
          fixedValue={userName}
        />
      )}
      <TextInput control={control} textPackage={PACKAGES['question']} fieldType="question" />
      <TextListInput
        control={control}
        fieldType={'votingOptions'}
        errorMessage={formState.errors.votingOptions?.message}
        textPackage={PACKAGES['votingOptions']}
      />
      <BooleanInput fieldType="isAnonymous" control={control} textPackage={PACKAGES['isAnonymous']} />
      <BooleanInput fieldType="showStatusWhenVoting" control={control} textPackage={PACKAGES['showStatusWhenVoting']} />
      <NumberInput
        fieldType="totalVotesCountMax"
        control={control}
        errorMessage={formState.errors.totalVotesCountMax?.message}
        textPackage={PACKAGES['totalVotesCountMax']}
        lowerLimit={optionVotesMaxCount}
      />
      <NumberInput
        fieldType="optionVotesCountMax"
        control={control}
        errorMessage={formState.errors.optionVotesCountMax?.message}
        textPackage={PACKAGES['optionVotesCountMax']}
        upperLimit={totalVotesMaxCount}
      />
      <ActionButtons mode={mode} reset={reset} formState={formState} />
    </form>
  )
}
