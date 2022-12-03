import { Center, Box } from '@chakra-ui/react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import BooleanTypeFormInput from '../../form-components/boolean-type-form-input/boolean-type-form-input'
import NumberTypeFormInput from '../../form-components/number-type-form-input/number-type-form-input'
import TextDateTimeItemsListFormInput from '../../form-components/text-date-time-list-form-input/text-date-time-list-form-input'
import TextTypeFormInput from '../../form-components/text-type-form-input/text-type-input'
import { TextDateTimeDataHolder } from '../data-models/text-date-time-data-holder'
import { yupResolver } from '@hookform/resolvers/yup'
import { createValidationSchema } from '../validation/validation'
import { useTranslation } from '../../../hooks/use-translation'
import { BOOLEAN_KEY_PACKAGES, NUMBER_KEY_PACKAGES, TEXT_KEY_PACKAGES } from '../../../utils/constant-values'
import { buttonsContainerStyle, formContainerStyle } from './styles'
import SmallButton from '../../widgets/small-button/small-button'

export const DATA_CY_CREATE_POLL_FORM = 'create_poll_form'
export const DATA_CY_RESET = 'reset'
export const DATA_CY_SUBMIT = 'submit'

export type CreatePollFormData = {
  question: string
  votingOptions: TextDateTimeDataHolder[]
  isAnonymous: boolean
  showStatus: boolean
  maxTotal: number
  maxPerOption: number
}

const initialValues: CreatePollFormData = {
  question: '',
  votingOptions: [] as TextDateTimeDataHolder[],
  isAnonymous: false,
  showStatus: false,
  maxTotal: 1,
  maxPerOption: 1
}

const CreatePollForm = () => {
  const { translate } = useTranslation()
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isDirty, isSubmitting, errors }
  } = useForm<FieldValues>({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(createValidationSchema(translate)),
    shouldFocusError: true
  })

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData)
  }

  return (
    <Box {...formContainerStyle} data-cy={DATA_CY_CREATE_POLL_FORM}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextTypeFormInput
          control={control}
          textConstantsPackage={TEXT_KEY_PACKAGES['question']}
          fieldType="question"
        />
        <TextDateTimeItemsListFormInput
          control={control}
          fieldType={'votingOptions'}
          errors={errors.votingOptions}
          textConstantsPackage={TEXT_KEY_PACKAGES['votingOptions']}
        />
        <BooleanTypeFormInput
          fieldType="isAnonymous"
          control={control}
          constantsPackage={BOOLEAN_KEY_PACKAGES['isAnonymous']}
        />
        <BooleanTypeFormInput
          fieldType="showStatus"
          control={control}
          constantsPackage={BOOLEAN_KEY_PACKAGES['showStatus']}
        />
        <NumberTypeFormInput
          fieldType="maxTotal"
          control={control}
          constantsPackage={NUMBER_KEY_PACKAGES['maxTotal']}
        />
        <NumberTypeFormInput
          fieldType="maxPerOption"
          control={control}
          constantsPackage={NUMBER_KEY_PACKAGES['maxPerOption']}
        />
        <Center {...buttonsContainerStyle}>
          <SmallButton
            text={translate('general_reset')}
            type="button"
            dataCyPostfix={DATA_CY_RESET}
            onClick={reset}
            isDisabled={!isDirty}
          />
          <SmallButton
            text={translate('general_submit')}
            type="submit"
            dataCyPostfix={DATA_CY_SUBMIT}
            isDisabled={!isValid || isSubmitting}
          />
        </Center>
      </form>
    </Box>
  )
}

export default CreatePollForm
