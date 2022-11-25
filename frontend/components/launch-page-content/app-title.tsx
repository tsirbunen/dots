import { Text, Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/use-translation'

import { ThemeColor } from '../../theme/theme'
import BlinkingDotsLine from '../blinking-dots-line'

import { appTitleContainerStyle, appTitleStyle } from './styles'

const AppTitle = () => {
  const { translate } = useTranslation()

  return (
    <Box {...appTitleContainerStyle}>
      <Text {...appTitleStyle} data-cy="app-title">
        {translate('app_title')}
      </Text>

      <Text fontSize="1em" color={ThemeColor.SHADE_1} fontWeight="normal" data-cy="app-title" align="center">
        {translate('app_short_description')}
      </Text>
      <BlinkingDotsLine />
    </Box>
  )
}

export default AppTitle
