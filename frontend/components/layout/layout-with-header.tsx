import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import HamburgerMenu from './hamburger-menu'
import ToggleLanguage from '../widgets/toggle-language/toggle-language'
import HeaderTitle from './header-title'
import { Styles } from './styles'

export const MOBILE_WIDTH_LOWER_LIMIT = 375

type LayoutWithHeaderProps = {
  children: JSX.Element | JSX.Element[]
  dataCy: string
}

const LayoutWithHeader = ({ children, dataCy }: LayoutWithHeaderProps) => {
  return (
    <Box minWidth={MOBILE_WIDTH_LOWER_LIMIT} data-cy={dataCy}>
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
