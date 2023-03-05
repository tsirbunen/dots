import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import InputModal from './input-modal'
import { Styles } from './styles'
import { TextInputPackage } from '../../../types/types'
import { PollFormData } from '../form-elements/poll-form'

export const DATA_CY_TEXT_INPUT = 'text_input'
export const DATA_CY_TEXT_INPUT_BUTTON = 'text_input_button'

type TextField = 'question' | 'ownerName'
type TextInputProps = {
  control: Control<PollFormData, unknown> | undefined
  textPackage: TextInputPackage
  fieldType: TextField
  disabled?: boolean
  fixedValue?: string
}

const TextInput = ({ control, textPackage, fieldType, disabled, fixedValue }: TextInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const onTextSave = (field: ControllerRenderProps<PollFormData, TextField>, newValue: string) => {
    field.onChange(newValue)
    onClose()
  }

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as string
        const value = fixedValue ? fixedValue : fieldValue
        const textStyle = value ? Styles.titleBase : Styles.error(false)

        return (
          <Box {...Styles.container}>
            <InputModal
              isOpen={isOpen}
              onClose={onClose}
              saveData={(newValue: string) => onTextSave(field, newValue)}
              originalText={fieldValue}
              textPackage={textPackage}
            />
            <Flex {...Styles.textContainer}>
              <Text {...textStyle} data-cy={`${DATA_CY_TEXT_INPUT}-${fieldType}`}>
                {value ? value : translate(textPackage.requiredInfoTextKey)}
              </Text>

              <IconButton
                aria-label={`${DATA_CY_TEXT_INPUT_BUTTON}-${fieldType}`}
                {...Styles.iconButton}
                icon={<EditIcon {...Styles.icon} />}
                onClick={onOpen}
                data-cy={`${DATA_CY_TEXT_INPUT_BUTTON}-${fieldType}`}
                disabled={disabled}
              />
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default TextInput
