import { Box, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Phrase } from '../../localization/translations'
import SimpleButton from '../small-button/simple-button'
import { modeSelectionButtonsContainerStyle } from './styles'

export const DATA_CY_USE_MODE = 'use-mode'
export enum AppRoute {
  CREATE_POLL = '/create-poll',
  VOTE_IN_POLL = '/vote-in-poll',
  VIEW_POLL = '/view-poll'
}

const ModeOfUseSelectionButtons = () => {
  const { translate } = useTranslation()
  const router = useRouter()

  const modePhrases = () => {
    const phrases = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
    return phrases as Phrase[]
  }

  const navigateToRoute = (route: string) => {
    if (route.includes('create')) router.push('/create-poll')
    if (route.includes('vote')) router.push('/vote-in-poll')
    if (route.includes('view')) router.push('/view-poll')
  }

  return (
    <Box {...modeSelectionButtonsContainerStyle}>
      {modePhrases().map((phrase, index) => {
        return (
          <Center key={phrase} data-cy={`${DATA_CY_USE_MODE}-${index}`}>
            <Box>
              <SimpleButton
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

export default ModeOfUseSelectionButtons
