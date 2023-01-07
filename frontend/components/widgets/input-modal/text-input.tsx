/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Text, Center, Container } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps, FieldErrorsImpl, UseFormReset } from 'react-hook-form'

import {
  TextDateTimeDataHolder,
  TextDateTimeDataType,
  TimeOfDay
} from '../../form-components/create-poll-form/text-date-time-data-holder'
import {
  textInputStyles,
  errorMessageStyle,
  textInputAddButtonContainer,
  errorMessageAndButtonContainer
} from './styles'
import { EditInputModalFormData } from './input-modal'
import { useTranslation } from '../../../hooks/use-translation'
import SmallButton from '../small-button/small-button'

export const DATA_CY_MODAL_ADD = 'modal_add'
export const DATA_CY_MODAL_INPUT_TEXT = 'modal_input_text'

type TextInputProps = {
  control: Control<EditInputModalFormData, any>
  reset: UseFormReset<EditInputModalFormData>
  errors: Partial<
    FieldErrorsImpl<{
      textInput: string
      date: Date
      time: TimeOfDay
    }>
  >
  onlyTextInput: boolean
  saveData: (newData: string | TextDateTimeDataHolder) => void
  editingOptionTextOriginal?: string | undefined
  placeholder?: string
  isValid: boolean
}

const TextInput = ({ onlyTextInput, saveData, placeholder, reset, control, errors, isValid }: TextInputProps) => {
  const { translate } = useTranslation()

  const handlePassOnInputTextData = (field: ControllerRenderProps<EditInputModalFormData, 'textInput'>) => {
    if (onlyTextInput && field.value) {
      saveData(field.value)
    } else {
      const newVotingOption = new TextDateTimeDataHolder(
        field.value,
        undefined,
        undefined,
        TextDateTimeDataType.PLAIN_TEXT
      )
      saveData(newVotingOption)
    }
    reset()
  }

  const renderErrorMessage = (errorMessage: string) => {
    return <Text {...errorMessageStyle}>{errorMessage}</Text>
  }

  return (
    <Controller
      name="textInput"
      control={control}
      render={({ field }) => {
        return (
          <Center>
            <Container {...textInputAddButtonContainer}>
              <Input
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder={placeholder ?? ''}
                {...textInputStyles}
                data-cy={DATA_CY_MODAL_INPUT_TEXT}
              />
              <Center {...errorMessageAndButtonContainer}>
                {errors.textInput?.message ? (
                  renderErrorMessage(errors.textInput?.message)
                ) : (
                  <SmallButton
                    text={translate('general_add')}
                    dataCyPostfix={DATA_CY_MODAL_ADD}
                    isLarger={true}
                    onClick={() => handlePassOnInputTextData(field)}
                    isDisabled={!isValid}
                  />
                )}
              </Center>
            </Container>
          </Center>
        )
      }}
    />
  )
}

export default TextInput
