import { Box, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import SmallButton from '../widgets/small-button/small-button'
import { Styles } from './styles'

export const DATA_CY_USE_MODE = 'use-mode'
export enum AppRoute {
  CREATE_POLL = '/create-poll',
  VOTE_IN_POLL = '/vote-in-poll',
  MY_POLLS = '/my-polls'
}

const ModeSelection = () => {
  const { translate } = useTranslation()
  const router = useRouter()

  const modePhrases = () => {
    return Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_')) as Phrase[]
  }

  const navigateToRoute = (route: string) => {
    if (route.includes('create')) router.push('/create-poll')
    if (route.includes('vote')) router.push('/vote')
  }

  return (
    <Box {...Styles.buttons}>
      {modePhrases().map((phrase, index) => {
        return (
          <Center key={phrase} data-cy={`${DATA_CY_USE_MODE}-${index}`}>
            <Box>
              <SmallButton
                text={translate(phrase).toUpperCase()}
                onClick={() => navigateToRoute(phrase)}
                dataCyPostfix={phrase}
              />
            </Box>
          </Center>
        )
      })}
    </Box>
  )
}

export default ModeSelection
