import { PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import ListItemDeletable from './list-item-deletable'
import { Styles } from './styles'
import { TextDateTimeDataHolder } from '../create-poll-form/text-date-time-data-holder'
import InputModal from '../../widgets/input-modal/input-modal'
import { PollFormData } from '../create-poll-form/poll-form'
import { TextDateTimeItemsInputConstantsPackage } from '../../../types/types'
import BlinkingText from '../../widgets/blinking-text/blinking-text'

type TextDateTimeListFormInputProps = {
  control: Control<PollFormData, TextDateTimeInputFieldType> | undefined
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

  const addItem = (newItem: unknown, field: ControllerRenderProps<PollFormData, TextDateTimeInputFieldType>) => {
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
    field: ControllerRenderProps<PollFormData, TextDateTimeInputFieldType>
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
        <Flex {...Styles.blinking}>
          <BlinkingText text={translate('too_little_options')} />
        </Flex>
      )
    }
    return (
      <Text data-cy={errorsString} {...Styles.error}>
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
            <Box {...Styles.parameterContainer}>
              <div>
                <Flex {...Styles.listItemsAndEditButtonContainer}>
                  <Flex {...Styles.listItemsContainer}>
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
                    {...Styles.iconButton}
                    icon={<PlusSquareIcon {...Styles.icon} />}
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
