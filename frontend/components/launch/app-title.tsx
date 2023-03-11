import { Text, Box, Center } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'
import { ThemeColor } from '../../theme/theme'
import BlinkingDotsLine from '../widgets/blinking-dots/blinking-dots-line'
import { Styles } from './styles'

export const DATA_CY_APP_TITLE = 'app_title'
export const DATA_CY_APP_DESCRIPTION = 'app_description'

const AppTitle = () => {
  const { translate } = useTranslation()

  return (
    <Center>
      <Box {...Styles.titleContainer}>
        <Text {...Styles.title} data-cy={DATA_CY_APP_TITLE}>
          {translate('app_title')}
        </Text>

        <Text {...Styles.appShort} color={ThemeColor.SHADE_1} data-cy={DATA_CY_APP_DESCRIPTION}>
          {translate('app_short_description')}
        </Text>
        <BlinkingDotsLine isSmall={false} />
      </Box>
    </Center>
  )
}

export default AppTitle
