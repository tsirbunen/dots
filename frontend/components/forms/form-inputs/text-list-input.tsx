import { PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { Styles } from './styles'
import InputModal from './input-modal'
import { DeleteIcon } from '@chakra-ui/icons'
import { TextInputPackage } from '../../../types/types'
import { PollFormData } from '../form-elements/poll-form'

export const DATA_CY_LIST_ADD = 'list_add'
export const DATA_CY_LIST_ITEM = 'list_item'

type TextListField = 'votingOptions'
type TextListInputProps = {
  control: Control<PollFormData, TextListField> | undefined
  errorMessage: string | undefined
  textPackage: TextInputPackage
  fieldType: TextListField
}

const TextListInput = ({ control, fieldType, errorMessage, textPackage }: TextListInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { translate } = useTranslation()

  const deleteItem = (item: string, value: string[], onChange: (...event: unknown[]) => void) => {
    const updatedItems = value.filter((option) => option !== item)
    onChange(updatedItems)
  }

  const addItem = (newItem: string, field: ControllerRenderProps<PollFormData, TextListField>) => {
    const updatedItems = [...field.value, newItem]
    field.onChange(updatedItems)
    onClose()
  }

  const renderListItems = (fieldValue: string[], field: ControllerRenderProps<PollFormData, TextListField>) => {
    return (fieldValue as string[]).map((item, index) => {
      return (
        <Flex key={`${index}-${item}`} {...Styles.listItemContainer}>
          <IconButton
            aria-label={`${DATA_CY_LIST_ITEM}`}
            {...Styles.listItem}
            icon={<DeleteIcon {...Styles.listItemIcon} />}
            onClick={() => deleteItem(item, fieldValue, field.onChange)}
          />
          <Text data-cy={`${DATA_CY_LIST_ITEM}-${index}`} {...Styles.listItemText}>
            {item}
          </Text>
        </Flex>
      )
    })
  }

  const renderErrorMessage = (errorsString: string, withSpacing: boolean) => {
    return (
      <Text data-cy={errorsString} {...Styles.error(withSpacing)}>
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
          const fieldValue = field.value as string[]
          const maxAllowedCountReached = fieldValue.length >= textPackage.maxItems
          return (
            <Box {...Styles.container}>
              <div>
                <Flex {...Styles.listContainer}>
                  <Flex {...Styles.listItemsContainer}>
                    {fieldValue.length === 0 && renderErrorMessage(translate(textPackage.requiredInfoTextKey), false)}
                    {renderListItems(fieldValue, field)}
                    {errorMessage && renderErrorMessage(errorMessage, true)}
                  </Flex>
                  <InputModal
                    isOpen={isOpen}
                    onClose={onClose}
                    saveData={(newItem: string) => addItem(newItem, field)}
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

export default TextListInput
