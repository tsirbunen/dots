import { Text, Box, Center } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { ThemeColor } from '../../theme/theme'
import BlinkingDotsLine from '../widgets/blinking-dots/blinking-dots-line'
import { appShortDescriptionStyle, appTitleContainerStyle, appTitleStyle } from './styles'

export const DATA_CY_APP_TITLE = 'app-title'
export const DATA_CY_APP_SHORT_DESCRIPTION = 'app-short-description'

const AppTitle = () => {
  const { translate } = useTranslation()

  return (
    <Center>
      <Box {...appTitleContainerStyle}>
        <Text {...appTitleStyle} data-cy={DATA_CY_APP_TITLE}>
          {translate('app_title')}
        </Text>

        <Text {...appShortDescriptionStyle} color={ThemeColor.SHADE_1} data-cy={DATA_CY_APP_SHORT_DESCRIPTION}>
          {translate('app_short_description')}
        </Text>
        <BlinkingDotsLine isSmall={false} />
      </Box>
    </Center>
  )
}

export default AppTitle
