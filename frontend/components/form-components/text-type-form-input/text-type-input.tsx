import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import InputModal from '../../widgets/input-modal/input-modal'
import { TextDateTimeDataHolder } from '../create-poll-form/text-date-time-data-holder'
import { iconButtonStyle, iconStyle, textContainerStyle, titleBaseStyle, textInputContainerStyle } from './styles'
import { CreatePollFormData } from '../create-poll-form/create-or-edit-poll-form-core'
import { TextDateTimeItemsInputConstantsPackage } from '../../../types/types'
import BlinkingText from '../../widgets/blinking-text/blinking-text'

export const DATA_CY_FORM_TEXT_INPUT = 'form_text_input'
export const DATA_CY_FORM_TEXT_INPUT_BUTTON = 'form_text_input_button'
export type TextInputFieldType = 'question' | 'ownerName'

type TextTypeFormInputProps = {
  control: Control<CreatePollFormData, unknown> | undefined
  textPackage: TextDateTimeItemsInputConstantsPackage
  fieldType: TextInputFieldType
  disabled?: boolean
}

const TextTypeFormInput = ({ control, textPackage, fieldType, disabled }: TextTypeFormInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const onTextSave = (
    field: ControllerRenderProps<CreatePollFormData, TextInputFieldType>,
    newValue: string | TextDateTimeDataHolder
  ) => {
    if (typeof newValue !== 'string') throw new Error(textPackage.wrong_data_type_error)
    field.onChange(newValue)
    onClose()
  }

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as string
        const textStyle = fieldValue ? titleBaseStyle : { ...titleBaseStyle }
        return (
          <Box {...textInputContainerStyle}>
            <InputModal
              isOpen={isOpen}
              onClose={onClose}
              onlyTextInput={true}
              saveData={(newValue: string | TextDateTimeDataHolder) => onTextSave(field, newValue)}
              originalText={fieldValue}
              textPackage={textPackage}
            />
            <Flex {...textContainerStyle}>
              {fieldValue ? (
                <Text {...textStyle} data-cy={`${DATA_CY_FORM_TEXT_INPUT}-${fieldType}`}>
                  {fieldValue ? fieldValue : translate(textPackage.requiredInfoTextKey)}
                </Text>
              ) : (
                <BlinkingText text={translate(textPackage.requiredInfoTextKey)} />
              )}

              <IconButton
                aria-label={`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-${fieldType}`}
                {...iconButtonStyle}
                icon={<EditIcon {...iconStyle} />}
                onClick={onOpen}
                data-cy={`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-${fieldType}`}
                disabled={disabled}
              />
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default TextTypeFormInput
