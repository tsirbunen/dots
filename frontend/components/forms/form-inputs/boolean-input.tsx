import { Flex, Text, Box, Checkbox } from '@chakra-ui/react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { BooleanInputPackage } from '../../../types/types'
import { PollFormData } from '../form-elements/poll-form'
import { Styles } from './styles'

export const DATA_CY_BOOLEAN_INPUT = 'boolean_input'

type BooleanField = 'isAnonymous' | 'showStatusWhenVoting'

type BooleanInputProps = {
  fieldType: BooleanField
  textPackage: BooleanInputPackage
  control: Control<PollFormData, unknown> | undefined
}

const BooleanInput = ({ fieldType, textPackage, control }: BooleanInputProps) => {
  const { translate } = useTranslation()

  const title = translate(textPackage.titleKey)

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as boolean
        return (
          <Box {...Styles.container}>
            <Flex {...Styles.textContainer}>
              <Text data-cy={title} {...Styles.title}>
                {title}
              </Text>
              <Checkbox
                isChecked={fieldValue}
                onChange={field.onChange}
                data-cy={`${DATA_CY_BOOLEAN_INPUT}-${fieldType}`}
              />
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default BooleanInput
