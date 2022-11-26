import { DATA_CY_APP_TITLE, DATA_CY_APP_SHORT_DESCRIPTION } from '../../../components/launch-page-content/app-title'
import {
  DATA_CY_HOW_DOES_IT_WORK,
  DATA_CY_USE_INSTRUCTION
} from '../../../components/launch-page-content/instructions-for-use'
import { DATA_CY_LAUNCH_PAGE } from '../../../components/launch-page-content/launch-page-content'
import { DATA_CY_USE_MODE } from '../../../components/launch-page-content/mode-of-use-selection-buttons'
import { FI_TRANSLATIONS } from '../../../localization/fi'
import { Base } from './base'

const INSTRUCTIONS_FOR_USE_COUNT = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('use_instruction')).length
const MODES_OF_USE_COUNT = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_')).length

export class LaunchPage extends Base {
  verifyLaunchPageIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_LAUNCH_PAGE)
  }

  verifyAppTitleIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_APP_TITLE)
  }

  verifyAppShortDescriptionIsVisible() {
    this._verifyDataCyIsVisible(DATA_CY_APP_SHORT_DESCRIPTION)
  }

  verifyUseInstructionsAreVisible() {
    this._verifyDataCyIsVisible(DATA_CY_HOW_DOES_IT_WORK)
    this._verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_INSTRUCTION, INSTRUCTIONS_FOR_USE_COUNT)
  }

  verifySelectionButtonsForModesOfUseAreVisible() {
    this._verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_USE_MODE, MODES_OF_USE_COUNT)
  }
}
