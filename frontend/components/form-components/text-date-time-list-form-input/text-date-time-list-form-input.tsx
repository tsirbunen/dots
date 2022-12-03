import { PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import {
  Control,
  FieldValues,
  Controller,
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldError,
  Merge
} from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { TextDateTimeItemsInputConstantsPackage } from '../../../utils/constant-values'
import ListItemDeletable from './list-item-deletable'
import {
  errorStyle,
  iconButtonStyle,
  iconStyle,
  listItemsAndEditButtonContainer,
  listItemsContainer,
  parameterContainerStyle,
  errorText
} from './styles'
import { TextDateTimeDataHolder } from '../../forms/data-models/text-date-time-data-holder'
import InputModal from '../../widgets/input-modal/input-modal'

type TextDateTimeListFormInputProps = {
  control: Control<FieldValues, TextDateTimeInputFieldType> | undefined
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined
  textConstantsPackage: TextDateTimeItemsInputConstantsPackage
  fieldType: TextDateTimeInputFieldType
}

export const DATA_CY_LIST_ADD = 'list_add'

export type TextDateTimeInputFieldType = 'votingOptions'

const TextDateTimeListFormInput = ({
  control,
  fieldType,
  errors,
  textConstantsPackage
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

  const addItem = (newItem: unknown, field: ControllerRenderProps<FieldValues, TextDateTimeInputFieldType>) => {
    if (!(newItem instanceof TextDateTimeDataHolder)) {
      throw new Error(textConstantsPackage.wrong_data_type_error)
    }
    const updatedItems = [...field.value, newItem]
    field.onChange(updatedItems)
    onClose()
  }

  const renderRequiredText = () => {
    return (
      <Text data-cy={translate(textConstantsPackage.requiredInfoTextKey)} {...errorText}>
        {translate(textConstantsPackage.requiredInfoTextKey)}
      </Text>
    )
  }

  const renderListItems = (
    fieldValue: TextDateTimeDataHolder[],
    field: ControllerRenderProps<FieldValues, TextDateTimeInputFieldType>
  ) => {
    return (fieldValue as TextDateTimeDataHolder[]).map((item, index) => {
      return (
        <ListItemDeletable
          key={`${index}-${item.formatData(translate)}`}
          item={item}
          index={index}
          deleteItem={() => deleteItem(item, fieldValue, field.onChange)}
        />
      )
    })
  }

  const renderErrorMessage = (errorsString: string) => {
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
          const maxAllowedCountReached = fieldValue.length >= textConstantsPackage.maxItems

          return (
            <Box {...parameterContainerStyle}>
              <div>
                <Flex {...listItemsAndEditButtonContainer}>
                  <Flex {...listItemsContainer}>
                    {fieldValue.length === 0 && renderRequiredText()}
                    {renderListItems(fieldValue, field)}
                    {errors?.message && renderErrorMessage(errors.message.toString())}
                  </Flex>
                  <InputModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onlyTextInput={false}
                    saveData={(newItem: unknown) => addItem(newItem, field)}
                    textConstantsPackage={textConstantsPackage}
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
