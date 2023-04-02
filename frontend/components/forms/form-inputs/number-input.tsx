import { Box, Flex, Text, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { Styles } from './styles'
import { TbNumber1, TbNumber2, TbNumber3 } from 'react-icons/tb'
import { useTranslation } from '../../../hooks/use-translation'
import { NumberInputPackage } from '../../../types/types'
import { PollFormData } from '../form-elements/poll-form'

export const DATA_CY_NUMBER_INPUT = 'number_input'

type NumberField = 'totalVotesCountMax' | 'optionVotesCountMax'

type NumberInputProps = {
  fieldType: NumberField
  control: Control<PollFormData, unknown> | undefined
  errorMessage: string | undefined
  textPackage: NumberInputPackage
  upperLimit?: number
  lowerLimit?: number
}

const NumberInput = ({ fieldType, control, errorMessage, textPackage, upperLimit, lowerLimit }: NumberInputProps) => {
  const { translate } = useTranslation()

  const multiplier = 10
  const title = translate(textPackage.titleKey)

  const handleNumberChanged = (field: ControllerRenderProps<PollFormData, NumberField>, newValue: number) => {
    const candidateValue = (newValue + multiplier) / multiplier
    if (lowerLimit && candidateValue < lowerLimit) return
    if (upperLimit && candidateValue > upperLimit) return
    field.onChange(candidateValue)
  }

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as number
        const fieldValueAsIcon = [TbNumber1, TbNumber2, TbNumber3][fieldValue - 1]
        const maxValue = (textPackage.maximum_value - 1) * multiplier
        const minValue = textPackage.minimum_value
        const sliderValue = (fieldValue - minValue) * 10
        return (
          <Box {...Styles.container}>
            <Flex {...Styles.textContainer}>
              <Text data-cy={title} {...Styles.title}>
                {title}
              </Text>

              <Box>
                <Slider
                  aria-label={DATA_CY_NUMBER_INPUT}
                  defaultValue={0}
                  step={multiplier}
                  max={maxValue}
                  {...Styles.slider(sliderValue, maxValue)}
                  value={sliderValue}
                  onChange={(newValue) => handleNumberChanged(field, newValue)}
                  data-cy={`${DATA_CY_NUMBER_INPUT}-${fieldType}`}
                >
                  <SliderTrack {...Styles.sliderTrack}>
                    <SliderFilledTrack {...Styles.sliderFilledTrack} />
                  </SliderTrack>
                  <SliderThumb {...Styles.sliderThumb}>
                    <Box {...Styles.sliderBox} as={fieldValueAsIcon} />
                  </SliderThumb>
                </Slider>
              </Box>
            </Flex>
            {errorMessage && (
              <Text data-cy={errorMessage} {...Styles.error()}>
                {errorMessage}
              </Text>
            )}
          </Box>
        )
      }}
    ></Controller>
  )
}

export default NumberInput
