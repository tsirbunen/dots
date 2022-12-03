import { Box, Flex, Text, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import {
  numberInputContainerStyle,
  titleStyle,
  titleContainerStyle,
  sliderThumbStyle,
  getSliderStyle,
  sliderFilledTrackStyle,
  sliderTrackStyle,
  sliderBoxStyle
} from './styles'
import { TbNumber1, TbNumber2, TbNumber3 } from 'react-icons/tb'
import { NumberInputConstantsPackage } from '../../../utils/constant-values'
import { useTranslation } from '../../../hooks/use-translation'

export const DATA_CY_FORM_NUMBER_INPUT = 'form_number_input'

export type NumberInputFieldType = 'maxTotal' | 'maxPerOption'

type NumberTypeFormInputProps = {
  fieldType: NumberInputFieldType
  control: Control<FieldValues, unknown> | undefined
  constantsPackage: NumberInputConstantsPackage
}

const NumberTypeFormInput = ({ fieldType, control, constantsPackage }: NumberTypeFormInputProps) => {
  const { translate } = useTranslation()

  const multiplier = 10
  const title = translate(constantsPackage.titleKey)

  const handleNumberChanged = (field: ControllerRenderProps<FieldValues, NumberInputFieldType>, newValue: number) => {
    field.onChange((newValue + multiplier) / multiplier)
  }

  return (
    <Controller
      name={fieldType}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value as number
        const fieldValueAsIcon = [TbNumber1, TbNumber2, TbNumber3][fieldValue - 1]
        const maxValue = (constantsPackage.maximum_value - 1) * multiplier
        const sliderValue = (fieldValue - constantsPackage.minimum_value) * 10

        return (
          <Box {...numberInputContainerStyle}>
            <Flex {...titleContainerStyle}>
              <Text data-cy={title} {...titleStyle}>
                {title}
              </Text>

              <Box>
                <Slider
                  aria-label={DATA_CY_FORM_NUMBER_INPUT}
                  defaultValue={0}
                  step={multiplier}
                  max={maxValue}
                  {...getSliderStyle(sliderValue, maxValue)}
                  value={sliderValue}
                  onChange={(newValue) => handleNumberChanged(field, newValue)}
                  data-cy={`${DATA_CY_FORM_NUMBER_INPUT}-${fieldType}`}
                >
                  <SliderTrack {...sliderTrackStyle}>
                    <SliderFilledTrack {...sliderFilledTrackStyle} />
                  </SliderTrack>
                  <SliderThumb {...sliderThumbStyle}>
                    <Box {...sliderBoxStyle} as={fieldValueAsIcon} />
                  </SliderThumb>
                </Slider>
              </Box>
            </Flex>
          </Box>
        )
      }}
    ></Controller>
  )
}

export default NumberTypeFormInput
