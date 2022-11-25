import { Text, Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'

import { howDoesItWorkStyle, instructionPhraseStyle } from './styles'

const UseInstructions = () => {
  const { translate } = useTranslation()

  const instructionPhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction'))
    return phrases as Phrase[]
  }

  return (
    <Box>
      <Text {...howDoesItWorkStyle} data-cy="app-title">
        {translate('how_does_it_work')}
      </Text>
      {instructionPhrases().map((phrase) => {
        return (
          <Text key={phrase} {...instructionPhraseStyle} data-cy={phrase}>
            {translate(phrase)}
          </Text>
        )
      })}
    </Box>
  )
}

export default UseInstructions
