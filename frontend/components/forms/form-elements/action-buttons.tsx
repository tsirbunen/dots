import { Center } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/use-translation'
import { Styles } from './styles'
import SmallButton from '../../widgets/small-button/small-button'
import { FormState, UseFormReset } from 'react-hook-form'
import { PollFormData } from './poll-form'

export const DATA_CY_RESET = 'reset'
export const DATA_CY_SUBMIT = 'submit'

export enum FormMode {
  'CREATE' = 'CREATE',
  'EDIT' = 'EDIT'
}

type FormActionsProps = {
  mode: FormMode
  reset: UseFormReset<PollFormData>
  formState: FormState<PollFormData>
}

export const ActionButtons = ({ mode, reset, formState }: FormActionsProps) => {
  const { translate } = useTranslation()
  const isDisabled = formState.isSubmitting || !formState.isDirty || Object.keys(formState.errors).length > 0

  return (
    <Center {...Styles.buttonsContainer}>
      {mode === FormMode.CREATE && (
        <SmallButton
          text={translate('general_reset')}
          type="button"
          dataCy={DATA_CY_RESET}
          onClick={reset}
          isDisabled={!formState.isDirty}
        />
      )}

      <SmallButton
        text={mode === FormMode.CREATE ? translate('general_submit') : translate('edit_poll_save_changes')}
        type="submit"
        dataCy={DATA_CY_SUBMIT}
        isDisabled={isDisabled}
      />
    </Center>
  )
}
