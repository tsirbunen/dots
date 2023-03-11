import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import HamburgerMenu from './hamburger-menu'
import ToggleLanguage from '../widgets/toggle-language/toggle-language'
import HeaderTitle from './header-title'
import { Styles } from './styles'

export const MOBILE_WIDTH_LOWER_LIMIT = 375
export const DATA_CY_APP_LAYOUT = 'app_layout'

const LayoutWithHeader = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <Box minWidth={MOBILE_WIDTH_LOWER_LIMIT} data-cy={DATA_CY_APP_LAYOUT}>
      <Center {...Styles.layout}>
        <HamburgerMenu />
        <HeaderTitle />
        <ToggleLanguage isRowMode={false} />
      </Center>
      {children}
    </Box>
  )
}

export default LayoutWithHeader
