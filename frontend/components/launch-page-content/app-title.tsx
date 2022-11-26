import { Text, Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { ThemeColor } from '../../theme/theme'
import BlinkingDotsLine from '../blinking-dots/blinking-dots-line'
import { appTitleContainerStyle, appTitleStyle } from './styles'

export const DATA_CY_APP_TITLE = 'app-title'
export const DATA_CY_APP_SHORT_DESCRIPTION = 'app-short-description'

const AppTitle = () => {
  const { translate } = useTranslation()

  return (
    <Box {...appTitleContainerStyle}>
      <Text {...appTitleStyle} data-cy={DATA_CY_APP_TITLE}>
        {translate('app_title')}
      </Text>

      <Text
        fontSize="1em"
        color={ThemeColor.SHADE_1}
        fontWeight="normal"
        data-cy={DATA_CY_APP_SHORT_DESCRIPTION}
        align="center"
      >
        {translate('app_short_description')}
      </Text>
      <BlinkingDotsLine />
    </Box>
  )
}

export default AppTitle
