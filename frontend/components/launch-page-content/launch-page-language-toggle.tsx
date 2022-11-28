import ToggleLanguage from '../toggle-language/toggle-language'
import { Center } from '@chakra-ui/react'

export const DATA_CY_LAUNCH_PAGE_LANGUAGE_TOGGLE = 'launch-page-language-toggle'

const LaunchPageLanguageToggle = () => {
  return (
    <Center marginTop="0px" data-cy={DATA_CY_LAUNCH_PAGE_LANGUAGE_TOGGLE}>
      <ToggleLanguage isLaunchPage={true} />
    </Center>
  )
}

export default LaunchPageLanguageToggle
