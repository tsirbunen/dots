import Instructions from './instructions'
import ModeSelection from './mode-selection'
import AppTitle from './app-title'
import LaunchPageLanguageToggle from './launch-page-language-toggle'
import DashboardInfo from './dashboard-info'

export const DATA_CY_LAUNCH_PAGE = 'launch_page'

/**
 * Launch page is the first page shown to the user on app launch.
 * On this page it is very shortly instructed what choices are available
 * for the user. Also, the page contains buttons with which user can navigate
 * easily to either start creating a new voting, to vote in an existing voting
 * or to manage user's own polls (if any) via a dashboard.
 */
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
