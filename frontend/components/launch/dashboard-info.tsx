import { Text, Box, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useBrowserStorage } from '../../hooks/use-browser-storage'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import SmallButton from '../widgets/small-button/small-button'
import { Styles } from './styles'

export const DATA_CY_DASHBOARD_INFO = 'dashboard_info'

const DashboardInfo = () => {
  const { translate } = useTranslation()
  const router = useRouter()
  const { storedPollCodesExist } = useBrowserStorage()
  const [hasUsedAppEarlier, setHasUsedAppEarlier] = useState(false)

  useEffect(() => {
    if (window) {
      const hasCodesInLocalStorage = storedPollCodesExist()
      setHasUsedAppEarlier(hasCodesInLocalStorage)
    }
  }, [storedPollCodesExist])

  const instructionPhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('dashboard_info'))
    return phrases as Phrase[]
  }

  if (!hasUsedAppEarlier) return <div></div>

  return (
    <Box>
      {instructionPhrases().map((phrase, index) => {
        return (
          <Text key={phrase} {...Styles.instruction} data-cy={`${DATA_CY_DASHBOARD_INFO}-${index}`}>
            {translate(phrase)}
          </Text>
        )
      })}

      <Center {...Styles.buttons}>
        <Box>
          <SmallButton
            text={translate('view_dashboard').toUpperCase()}
            onClick={() => router.push('/dashboard')}
            dataCy={DATA_CY_DASHBOARD_INFO}
          />
        </Box>
      </Center>
    </Box>
  )
}

export default DashboardInfo
