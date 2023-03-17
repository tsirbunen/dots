import { DATA_CY_LANGUAGE, DATA_CY_LANGUAGE_TOGGLE } from '../../components/widgets/toggle-language/toggle-language'
import { Language, TRANSLATIONS } from '../../hooks/use-translation'
import { FI_TRANSLATIONS } from '../../localization/fi'
import { Base } from './base'

export class LaunchPage extends Base {
  verifyAppLanguageIsTheGivenLanguage(language: string) {
    assert(Object.keys(Language).includes(language))
    const exampleElementTextInLanguage = TRANSLATIONS[language]['how_does_it_work']
    cy.contains(exampleElementTextInLanguage)
  }

  clickTheLanguageToggle() {
    const toggleButton = cy.getByDataCy(DATA_CY_LANGUAGE_TOGGLE)
    toggleButton.click()
  }

  verifyLanguageSelectionButtonsVisibilityType(visibility: string) {
    const languageDataCys = [`${DATA_CY_LANGUAGE}-EN`, `${DATA_CY_LANGUAGE}-FI`]
    languageDataCys.forEach((languageDataCy) => {
      if (visibility === 'invisible') this.verifyDataCyIsNotVisible(languageDataCy)
      else if (visibility === 'visible') this.verifyDataCyIsVisible(languageDataCy)
      else throw new Error('Language button visibility must be invisible or visible!')
    })
  }

  clickLanguageSelectionButton(language: string) {
    const selectionButton = cy.contains(language)
    selectionButton.click()
  }

  clickUseModeButton(useMode: string) {
    let mode: string
    if (useMode.includes('create')) mode = 'create'
    else if (useMode.includes('vote')) mode = 'vote'
    else if (useMode.includes('view')) mode = 'view'
    else throw new Error(`Use mode button for ${useMode} not available on Launch Page!`)
    const targetRouteButton = this.getUseModeButton(mode)
    targetRouteButton.click()
  }

  getUseModeButton(mode: string) {
    const modesOfUse = Object.keys(FI_TRANSLATIONS).filter((key) => key.includes('mode_'))
    const searchText = `${modesOfUse.filter((mode_of_use) => mode_of_use.includes(mode))[0]}`
    return cy.getByDataCy(searchText)
  }
}
