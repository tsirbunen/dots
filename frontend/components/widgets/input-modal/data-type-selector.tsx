import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { ThemeColorCodes } from '../../../theme/theme'
import { TextDateTimeDataType } from '../../form-components/create-poll-form/text-date-time-data-holder'
import { dataTypeSelectorContainerStyle, getBorderStyle } from './styles'

export const DATA_CY_MODAL_DATA_TYPE_SELECTOR = 'MODAL_DATA_TYPE_SELECTOR'

type DataTypeSelectorProps = {
  setSelectedDataType: (newDataType: TextDateTimeDataType) => void
  selectedDataType: TextDateTimeDataType
}

const DataTypeSelector = ({ setSelectedDataType, selectedDataType }: DataTypeSelectorProps) => {
  return (
    <Box {...dataTypeSelectorContainerStyle}>
      <RadioGroup onChange={setSelectedDataType} value={selectedDataType}>
        <Stack>
          {Object.values(TextDateTimeDataType).map((dataType) => {
            return (
              <Radio
                key={`${DATA_CY_MODAL_DATA_TYPE_SELECTOR}-${dataType}`}
                size="lg"
                value={dataType as TextDateTimeDataType}
                borderColor={ThemeColorCodes.SHADE_2}
                color={ThemeColorCodes.BACKGROUND}
                data-cy={DATA_CY_MODAL_DATA_TYPE_SELECTOR}
                _checked={{ ...getBorderStyle(dataType === selectedDataType) }}
              >
                {dataType}
              </Radio>
            )
          })}
        </Stack>
      </RadioGroup>
    </Box>
  )
}

export default DataTypeSelector
