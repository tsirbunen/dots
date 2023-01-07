import { PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import ListItemDeletable from './list-item-deletable'
import {
  blinkingStyle,
  errorStyle,
  iconButtonStyle,
  iconStyle,
  listItemsAndEditButtonContainer,
  listItemsContainer,
  parameterContainerStyle
} from './styles'
import { TextDateTimeDataHolder } from '../create-poll-form/text-date-time-data-holder'
import InputModal from '../../widgets/input-modal/input-modal'
import { CreatePollFormData } from '../create-poll-form/create-or-edit-poll-form-core'
import { TextDateTimeItemsInputConstantsPackage } from '../../../types/types'
import BlinkingText from '../../widgets/blinking-text/blinking-text'

type TextDateTimeListFormInputProps = {
  control: Control<CreatePollFormData, TextDateTimeInputFieldType> | undefined
  errorMessage: string | undefined
  textPackage: TextDateTimeItemsInputConstantsPackage
  fieldType: TextDateTimeInputFieldType
}

export const DATA_CY_LIST_ADD = 'list_add'

export type TextDateTimeInputFieldType = 'votingOptions'

const TextDateTimeListFormInput = ({
  control,
  fieldType,
  errorMessage,
  textPackage
}: TextDateTimeListFormInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const deleteItem = (
    item: TextDateTimeDataHolder,
    value: TextDateTimeDataHolder[],
    onChange: (...event: unknown[]) => void
  ) => {
    const updatedItems = value.filter((option) => option !== item)
    onChange(updatedItems)
  }

  const addItem = (newItem: unknown, field: ControllerRenderProps<CreatePollFormData, TextDateTimeInputFieldType>) => {
    if (!(newItem instanceof TextDateTimeDataHolder)) {
      throw new Error(textPackage.wrong_data_type_error)
    }
    const updatedItems = [...field.value, newItem]
    field.onChange(updatedItems)
    onClose()
  }

  const renderRequiredText = () => {
    return <BlinkingText text={translate(textPackage.requiredInfoTextKey)} />
  }

  const renderListItems = (
    fieldValue: TextDateTimeDataHolder[],
    field: ControllerRenderProps<CreatePollFormData, TextDateTimeInputFieldType>
  ) => {
    return (fieldValue as TextDateTimeDataHolder[]).map((item, index) => {
      return (
        <ListItemDeletable
          key={`${index}-${item.formatData(translate)}`}
          item={item.formatData(translate)}
          index={index}
          deleteItem={() => deleteItem(item, fieldValue, field.onChange)}
        />
      )
    })
  }

  const renderErrorMessage = (errorsString: string) => {
    if (errorsString === translate('too_little_options')) {
      return (
        <Flex {...blinkingStyle}>
          <BlinkingText text={translate('too_little_options')} />
        </Flex>
      )
    }
    return (
      <Text data-cy={errorsString} {...errorStyle}>
        {errorsString}
      </Text>
    )
  }

  return (
    <Box>
      <Controller
        name={fieldType}
        control={control}
        render={({ field }) => {
          const fieldValue = field.value as TextDateTimeDataHolder[]
          const maxAllowedCountReached = fieldValue.length >= textPackage.maxItems
          return (
            <Box {...parameterContainerStyle}>
              <div>
                <Flex {...listItemsAndEditButtonContainer}>
                  <Flex {...listItemsContainer}>
                    {fieldValue.length === 0 && renderRequiredText()}
                    {renderListItems(fieldValue, field)}
                    {errorMessage && renderErrorMessage(errorMessage)}
                  </Flex>
                  <InputModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onlyTextInput={false}
                    saveData={(newItem: unknown) => addItem(newItem, field)}
                    textPackage={textPackage}
                  />
                  <IconButton
                    aria-label={`${DATA_CY_LIST_ADD}-${fieldType}`}
                    {...iconButtonStyle}
                    icon={<PlusSquareIcon {...iconStyle} />}
                    onClick={onOpen}
                    data-cy={DATA_CY_LIST_ADD}
                    isDisabled={maxAllowedCountReached}
                  />
                </Flex>
              </div>
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default TextDateTimeListFormInput
