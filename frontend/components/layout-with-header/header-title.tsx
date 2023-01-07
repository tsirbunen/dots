import React from 'react'
import { Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import BlinkingDotsLine from '../widgets/blinking-dots/blinking-dots-line'
import { headerTitleContainer, routeTextStyle } from './styles'
import { useTranslation } from '../../hooks/use-translation'
import { Phrase } from '../../localization/translations'

export const MOBILE_WIDTH_LOWER_LIMIT = 375

const HeaderTitle = () => {
  const { translate } = useTranslation()
  const router = useRouter()
  const pathName = router.pathname
  const getRouteText = (path: string) => {
    let phrase: Phrase | undefined
    if (path.includes('create')) phrase = 'route_text_create_poll'
    if (path.includes('vote')) phrase = 'route_text_vote_in_poll'
    if (path.includes('view')) phrase = 'route_text_view_poll'
    if (path.includes('dashboard')) phrase = 'route_text_dashboard'
    if (phrase === undefined) throw new Error(`No such route as ${path}!`)
    return translate(phrase).toUpperCase()
  }

  return (
    <Center {...headerTitleContainer}>
      <BlinkingDotsLine isSmall={true} />
      <Text {...routeTextStyle}>{getRouteText(pathName)}</Text>
    </Center>
  )
}

export default HeaderTitle
