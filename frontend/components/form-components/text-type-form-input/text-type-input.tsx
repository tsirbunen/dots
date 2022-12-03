import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { ThemeColorCodes } from '../../../theme/theme'
import { TextDateTimeItemsInputConstantsPackage } from '../../../utils/constant-values'
import InputModal from '../../widgets/input-modal/input-modal'
import { TextDateTimeDataHolder } from '../../forms/data-models/text-date-time-data-holder'
import { iconButtonStyle, iconStyle, textContainerStyle, titleBaseStyle, textInputContainerStyle } from './styles'

export const DATA_CY_FORM_TEXT_INPUT = 'form_text_input'
export const DATA_CY_FORM_TEXT_INPUT_BUTTON = 'form_text_input_button'
export type TextInputFieldType = 'question'

type TextTypeFormInputProps = {
  control: Control<FieldValues, unknown> | undefined
  textConstantsPackage: TextDateTimeItemsInputConstantsPackage
  fieldType: TextInputFieldType
}

const TextTypeFormInput = ({ control, textConstantsPackage, fieldType }: TextTypeFormInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const onTextSave = (
    field: ControllerRenderProps<FieldValues, TextInputFieldType>,
    newValue: string | TextDateTimeDataHolder
  ) => {
    if (typeof newValue !== 'string') throw new Error(textConstantsPackage.wrong_data_type_error)
    field.onChange(newValue)
    onClose()
  }

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as string
        const textStyle = fieldValue ? titleBaseStyle : { ...titleBaseStyle, color: ThemeColorCodes.ERROR }

        return (
          <Box {...textInputContainerStyle}>
            <InputModal
              isOpen={isOpen}
              onClose={onClose}
              onlyTextInput={true}
              saveData={(newValue: string | TextDateTimeDataHolder) => onTextSave(field, newValue)}
              originalText={fieldValue}
              textConstantsPackage={textConstantsPackage}
            />
            <Flex {...textContainerStyle}>
              <Text {...textStyle} data-cy={`${DATA_CY_FORM_TEXT_INPUT}-${fieldType}`}>
                {fieldValue ? fieldValue : translate(textConstantsPackage.requiredInfoTextKey)}
              </Text>
              <IconButton
                aria-label={`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-${fieldType}`}
                {...iconButtonStyle}
                icon={<EditIcon {...iconStyle} />}
                onClick={onOpen}
                data-cy={`${DATA_CY_FORM_TEXT_INPUT_BUTTON}-${fieldType}`}
              />
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default TextTypeFormInput
