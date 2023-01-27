import Instructions from './instructions'
import ModeSelection from './mode-selection'
import AppTitle from './app-title'
import LaunchPageLanguageToggle from './launch-page-language-toggle'
import DashboardInfo from './dashboard-info'

export const DATA_CY_LAUNCH_PAGE = 'launch_page'

const LaunchPageContent = () => {
  return (
    <div data-cy={DATA_CY_LAUNCH_PAGE}>
      <AppTitle />
      <LaunchPageLanguageToggle />
      <Instructions />
      <ModeSelection />
      <DashboardInfo />
    </div>
  )
}

export default LaunchPageContent
