import { Text, Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import { Styles } from './styles'

export const DATA_CY_HOW_DOES_IT_WORK = 'how_does_it_work'
export const DATA_CY_USE_INSTRUCTION = 'use_instruction'

const Instructions = () => {
  const { translate } = useTranslation()

  const instructionPhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction'))
    return phrases as Phrase[]
  }

  return (
    <Box>
      <Text {...Styles.howDoesItWork} data-cy={DATA_CY_HOW_DOES_IT_WORK}>
        {translate('how_does_it_work')}
      </Text>
      {instructionPhrases().map((phrase, index) => {
        return (
          <Text key={phrase} {...Styles.instruction} data-cy={`${DATA_CY_USE_INSTRUCTION}-${index}`}>
            {translate(phrase)}
          </Text>
        )
      })}
    </Box>
  )
}

export default Instructions
