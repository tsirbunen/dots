import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import InputModal from '../../widgets/input-modal/input-modal'
import { TextDateTimeDataHolder } from '../create-poll-form/text-date-time-data-holder'
import { Styles } from './styles'
import { PollFormData } from '../create-poll-form/poll-form'
import { TextDateTimeItemsInputConstantsPackage } from '../../../types/types'
import BlinkingText from '../../widgets/blinking-text/blinking-text'

export const DATA_CY_FORM_TEXT_INPUT = 'form_text_input'
export const DATA_CY_FORM_TEXT_INPUT_BUTTON = 'form_text_input_button'
export type TextInputFieldType = 'question' | 'ownerName'

type TextTypeFormInputProps = {
  control: Control<PollFormData, unknown> | undefined
  textPackage: TextDateTimeItemsInputConstantsPackage
  fieldType: TextInputFieldType
  disabled?: boolean
  value?: string
}

const TextTypeFormInput = ({ control, textPackage, fieldType, disabled, value }: TextTypeFormInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const onTextSave = (
    field: ControllerRenderProps<PollFormData, TextInputFieldType>,
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
        const textStyle = fieldValue ? Styles.titleBase : { ...Styles.titleBase }
        const trueValue = value ? value : fieldValue
        return (
          <Box {...Styles.textInputContainer}>
            <InputModal
              isOpen={isOpen}
              onClose={onClose}
              onlyTextInput={true}
              saveData={(newValue: string | TextDateTimeDataHolder) => onTextSave(field, newValue)}
              originalText={fieldValue}
              textPackage={textPackage}
            />
            <Flex {...Styles.textContainer}>
              {trueValue ? (
                <Text {...textStyle} data-cy={`${DATA_CY_FORM_TEXT_INPUT}-${fieldType}`}>
                  {trueValue ? trueValue : translate(textPackage.requiredInfoTextKey)}
                </Text>
              ) : (
                <BlinkingText text={translate(textPackage.requiredInfoTextKey)} />
              )}

              <IconButton
                aria-label={`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-${fieldType}`}
                {...Styles.iconButtonStyle}
                icon={<EditIcon {...Styles.icon} />}
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
