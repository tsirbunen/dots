import InstructionsForUse from './instructions-for-use'
import ModeOfUseSelectionButtons from './mode-of-use-selection-buttons'
import AppTitle from './app-title'
import LaunchPageLanguageToggle from './launch-page-language-toggle'
import DashboardInfo from './dashboard-info'

export const DATA_CY_LAUNCH_PAGE = 'launch_page'

const LaunchPageContent = () => {
  return (
    <div data-cy={DATA_CY_LAUNCH_PAGE}>
      <AppTitle />
      <LaunchPageLanguageToggle />
      <InstructionsForUse />
      <ModeOfUseSelectionButtons />
      <DashboardInfo />
    </div>
  )
}

export default LaunchPageContent
