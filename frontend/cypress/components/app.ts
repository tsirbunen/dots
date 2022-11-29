import { Base } from './base'
import { CreatePollPage } from './create-poll-page'
import { ViewPollPage } from './view-poll-page'
import { VoteInPollPage } from './vote-in-poll-page'
import { DATA_CY_MENU_BUTTON, DATA_CY_ROUTE_BUTTON } from '../../components/layout-with-header/hamburger-menu'
import { LaunchPage } from './launch-page'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`
const MENU_NAVIGATION_TARGETS_COUNT = 4

export class App extends Base {
  verifyPageIsVisible(targetPage: string) {
    let page: CreatePollPage | VoteInPollPage | ViewPollPage
    if (targetPage.includes('create')) page = new CreatePollPage()
    else if (targetPage.includes('vote')) page = new VoteInPollPage()
    else if (targetPage.includes('view')) page = new ViewPollPage()
    else if (targetPage.includes('launch')) page = new LaunchPage()
    else throw new Error(`Cannot navigate to page ${targetPage}!`)
    page.verifyPageIsVisible()
  }

  navigateToPage(route: string) {
    cy.visit(`${CLIENT_BASE_URL}/${route}`)
  }

  clickHamburgerMenuButton() {
    cy.getByDataCy(DATA_CY_MENU_BUTTON).click()
  }

  verifyHamburgerMenuIsOpen() {
    this._verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_ROUTE_BUTTON, MENU_NAVIGATION_TARGETS_COUNT)
  }

  clickMenuNavigationButton(targetRoute: string) {
    const dataCy = `${DATA_CY_ROUTE_BUTTON}-${targetRoute}`
    cy.getByDataCy(dataCy).click()
  }
}
