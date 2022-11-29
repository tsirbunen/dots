import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { LaunchPage } from '../../components/launch-page'
import { App } from '../../components/app'

const launchPage = new LaunchPage()
const app = new App()

When('one clicks the {string} button', (targetRoute: string) => {
  launchPage.clickRouteButton(targetRoute)
})

Then('one is taken to {string}', (targetPage: string) => {
  app.verifyPageIsVisible(targetPage)
})

Given('one has navigated to the {string}', (page: string) => {
  app.navigateToPage(page)
})

When('one clicks the hamburger menu button', () => {
  app.clickHamburgerMenuButton()
})

Then('the navigation menu is open', () => {
  app.verifyHamburgerMenuIsOpen()
})

When('one clicks the {string} menu button', (targetRoute: string) => {
  app.clickMenuNavigationButton(targetRoute)
})
