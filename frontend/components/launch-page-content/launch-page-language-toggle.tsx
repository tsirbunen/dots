import ToggleLanguage from '../toggle-language/toggle-language'
import { Center } from '@chakra-ui/react'

const LaunchPageLanguageToggle = () => {
  return (
    <Center>
      <ToggleLanguage isLaunchPage={true} />
    </Center>
  )
}

export default LaunchPageLanguageToggle
