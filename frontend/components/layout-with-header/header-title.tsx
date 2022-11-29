import React from 'react'
import { Center, Text } from '@chakra-ui/react'

import BlinkingDotsLine from '../blinking-dots/blinking-dots-line'
import { appTitleStyle } from './styles'
import { useTranslation } from '../../hooks/use-translation'

export const MOBILE_WIDTH_LOWER_LIMIT = 375
export const DATA_CY_APP_LAYOUT = 'app-layout'

const HeaderTitle = () => {
  const { translate } = useTranslation()
  return (
    <Center flexDirection="column">
      <Text {...appTitleStyle}>{translate('app_title')}</Text>
      <BlinkingDotsLine isSmall={true} />
    </Center>
  )
}

export default HeaderTitle
