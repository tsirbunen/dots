import InstructionsForUse from './instructions-for-use'
import ModeOfUseSelectionButtons from './mode-of-use-selection-buttons'
import AppTitle from './app-title'

const LaunchPageContent = () => {
  return (
    <div>
      <AppTitle />
      <InstructionsForUse />
      <ModeOfUseSelectionButtons />
    </div>
  )
}

export default LaunchPageContent
