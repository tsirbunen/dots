import InstructionsForUse from './instructions-for-use'
import ModeOfUseSelectionButtons from './mode-of-use-selection-buttons'
import AppTitle from './app-title'
import LaunchPageLanguageToggle from './launch-page-language-toggle'

export const DATA_CY_LAUNCH_PAGE = 'launch-page'

const LaunchPageContent = () => {
  return (
    <div data-cy={DATA_CY_LAUNCH_PAGE}>
      <AppTitle />
      <LaunchPageLanguageToggle />
      <InstructionsForUse />
      <ModeOfUseSelectionButtons />
    </div>
  )
}

export default LaunchPageContent
