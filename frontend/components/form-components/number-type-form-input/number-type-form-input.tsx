import { Box, Flex, Text, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'

import {
  numberInputContainerStyle,
  titleStyle,
  titleContainerStyle,
  sliderThumbStyle,
  getSliderStyle,
  sliderFilledTrackStyle,
  sliderTrackStyle,
  sliderBoxStyle,
  errorStyle
} from './styles'
import { TbNumber1, TbNumber2, TbNumber3 } from 'react-icons/tb'

import { useTranslation } from '../../../hooks/use-translation'
import { CreatePollFormData } from '../create-poll-form/create-or-edit-poll-form-core'
import { NumberInputConstantsPackage } from '../../../types/types'

export const DATA_CY_FORM_NUMBER_INPUT = 'form_number_input'

export type NumberInputFieldType = 'totalVotesCountMax' | 'optionVotesCountMax'

type NumberTypeFormInputProps = {
  fieldType: NumberInputFieldType
  control: Control<CreatePollFormData, unknown> | undefined
  errorMessage: string | undefined
  textPackage: NumberInputConstantsPackage
  upperLimit?: number
  lowerLimit?: number
}

const NumberTypeFormInput = ({
  fieldType,
  control,
  errorMessage,
  textPackage,
  upperLimit,
  lowerLimit
}: NumberTypeFormInputProps) => {
  const { translate } = useTranslation()

  const multiplier = 10
  const title = translate(textPackage.titleKey)

  const handleNumberChanged = (
    field: ControllerRenderProps<CreatePollFormData, NumberInputFieldType>,
    newValue: number
  ) => {
    const candidateValue = (newValue + multiplier) / multiplier
    if (lowerLimit && candidateValue < lowerLimit) return
    if (upperLimit && candidateValue > upperLimit) return
    field.onChange(candidateValue)
  }
  const renderErrorMessage = (errorsString: string) => {
    return (
      <Text data-cy={errorsString} {...errorStyle}>
        {errorsString}
      </Text>
    )
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
            {errorMessage && renderErrorMessage(errorMessage)}
          </Box>
        )
      }}
    ></Controller>
  )
}

export default NumberTypeFormInput
