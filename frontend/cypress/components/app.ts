import { Base } from './base'
import { DATA_CY_MENU_BUTTON, DATA_CY_ROUTE_BUTTON } from '../../components/layout-with-header/hamburger-menu'
import { DATA_CY_LAUNCH_PAGE } from '../../components/launch-page-content/launch-page-content'
import { DATA_CY_CREATE_POLL_PAGE } from '../../pages/create-poll'
import { DATA_CY_VIEW_POLL_PAGE } from '../../pages/view-poll'
import { DATA_CY_VOTE_IN_POLL_PAGE } from '../../pages/vote-in-poll'
import { DATA_CY_DASHBOARD_PAGE } from '../../components/dashboard-content/dashboard-content'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`
const MENU_NAVIGATION_TARGETS_COUNT = 5

export class App extends Base {
  navigateToDotsApp() {
    cy.visit(CLIENT_BASE_URL)
  }

  verifyPageIsVisible(targetPage: string) {
    let pageName: string
    if (targetPage.includes('create')) pageName = DATA_CY_CREATE_POLL_PAGE
    else if (targetPage.includes('vote')) pageName = DATA_CY_VOTE_IN_POLL_PAGE
    else if (targetPage.includes('view')) pageName = DATA_CY_VIEW_POLL_PAGE
    else if (targetPage.includes('launch')) pageName = DATA_CY_LAUNCH_PAGE
    else if (targetPage.includes('dashboard')) pageName = DATA_CY_DASHBOARD_PAGE
    else throw new Error(`Cannot navigate to page ${targetPage}!`)
    this.verifyDataCyIsVisible(pageName)
  }

  navigateToPage(route: string) {
    cy.visit(`${CLIENT_BASE_URL}/${route}`)
  }

  clickHamburgerMenuButton() {
    cy.getByDataCy(DATA_CY_MENU_BUTTON).click()
  }

  verifyHamburgerMenuIsOpen() {
    this.verifyDataCyBeginsWithInstancesAreVisible(DATA_CY_ROUTE_BUTTON, MENU_NAVIGATION_TARGETS_COUNT)
  }

  clickMenuNavigationButton(targetRoute: string) {
    cy.getByDataCy(`${DATA_CY_ROUTE_BUTTON}-${targetRoute}`).click()
  }
}
