import { Flex, Text, Box, Checkbox } from '@chakra-ui/react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { BooleanInputConstantsPackage } from '../../../types/types'

import { PollFormData } from '../create-poll-form/poll-form'
import { Styles } from './styles'

export const DATA_CY_FORM_BOOLEAN_INPUT = 'form_boolean_input'

export type BooleanInputFieldType = 'isAnonymous' | 'showStatusWhenVoting'

type BooleanTypeFormInputProps = {
  fieldType: BooleanInputFieldType
  textPackage: BooleanInputConstantsPackage

  control: Control<PollFormData, unknown> | undefined
}

const BooleanTypeFormInput = ({ fieldType, textPackage, control }: BooleanTypeFormInputProps) => {
  const { translate } = useTranslation()

  const title = translate(textPackage.titleKey)

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as boolean
        return (
          <Box {...Styles.inputContainer}>
            <Flex {...Styles.titleContainer}>
              <Text data-cy={title} {...Styles.title}>
                {title}
              </Text>
              <Checkbox
                isChecked={fieldValue}
                onChange={field.onChange}
                data-cy={`${DATA_CY_FORM_BOOLEAN_INPUT}-${fieldType}`}
              />
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default BooleanTypeFormInput
