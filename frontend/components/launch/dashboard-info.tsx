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
  const { hasStoredPollCodes } = useBrowserStorage()
  const [isOldUser, setIsOldUser] = useState(false)

  useEffect(() => {
    if (window) {
      const hasCodesInLocalStorage = hasStoredPollCodes()
      setIsOldUser(hasCodesInLocalStorage)
    }
  }, [hasStoredPollCodes])

  const instructionPhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('dashboard_info'))
    return phrases as Phrase[]
  }

  if (!isOldUser) return <div></div>

  return (
    <Box>
      {instructionPhrases().map((phrase, index) => {
        return (
          <Text key={phrase} {...Styles.instruction} data-cy={`${DATA_CY_DASHBOARD_INFO}-${index}`}>
            {translate(phrase)}
          </Text>
        )
      })}

      <Center style={{ marginTop: '20px' }}>
        <Box>
          <SmallButton
            text={translate('view_dashboard').toUpperCase()}
            onClick={() => router.push('/dashboard')}
            dataCyPostfix={DATA_CY_DASHBOARD_INFO}
          />
        </Box>
      </Center>
    </Box>
  )
}

export default DashboardInfo
