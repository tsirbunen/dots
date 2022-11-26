import InstructionsForUse from './instructions-for-use'
import ModeOfUseSelectionButtons from './mode-of-use-selection-buttons'
import AppTitle from './app-title'

export const DATA_CY_LAUNCH_PAGE = 'launch-page'

const LaunchPageContent = () => {
  return (
    <div data-cy={DATA_CY_LAUNCH_PAGE}>
      <AppTitle />
      <InstructionsForUse />
      <ModeOfUseSelectionButtons />
    </div>
  )
}

export default LaunchPageContent
