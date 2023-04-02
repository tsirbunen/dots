import { Flex, Text } from '@chakra-ui/react'
import { Styles } from './styles'
import { useTranslation } from '../../../hooks/use-translation'
import { Phrase } from '../../../localization/translations'

export const DATA_CY_WHAT_NEXT_INFO = 'what_next_info'

type WhatToDoInfoProps = {
  pollQuestion: string
  infoPhrases: Phrase[]
}

export const WhatToDoNextInfo = ({ pollQuestion, infoPhrases }: WhatToDoInfoProps) => {
  const { translate } = useTranslation()

  return (
    <Flex {...Styles.outerContainer} data-cy={DATA_CY_WHAT_NEXT_INFO}>
      <Flex {...Styles.questionContainer}>
        <Text {...Styles.pollQuestion}>{pollQuestion}</Text>
      </Flex>
      <Text key={`text-what_to_do_next`} {...Styles.infoTitle}>
        {translate('what_to_do_next')}
      </Text>
      <Flex {...Styles.infoLinesContainer}>
        {infoPhrases.map((phrase) => {
          return (
            <Flex key={`text-${phrase}`} {...Styles.infoRow}>
              <Flex {...Styles.dot} />
              <Text {...Styles.generalInfo}>{translate(phrase)}</Text>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

// TODO: Implement showing QR code in addition to the poll code
