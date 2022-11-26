import { Text, Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import { howDoesItWorkStyle, instructionPhraseStyle } from './styles'

export const DATA_CY_HOW_DOES_IT_WORK = 'how-does-it-work'
export const DATA_CY_USE_INSTRUCTION = 'use-instruction'

const InstructionsForUse = () => {
  const { translate } = useTranslation()

  const instructionPhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction'))
    return phrases as Phrase[]
  }

  return (
    <Box>
      <Text {...howDoesItWorkStyle} data-cy={DATA_CY_HOW_DOES_IT_WORK}>
        {translate('how_does_it_work')}
      </Text>
      {instructionPhrases().map((phrase, index) => {
        return (
          <Text key={phrase} {...instructionPhraseStyle} data-cy={`${DATA_CY_USE_INSTRUCTION}-${index}`}>
            {translate(phrase)}
          </Text>
        )
      })}
    </Box>
  )
}

export default InstructionsForUse
