import { defineConfig } from 'cypress'
import configuration from './cypress/plugins/index'

export default defineConfig({
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: '[status]_[datetime]-[name]',
    timestamp: 'yyyy-mm-dd',
    html: true,
    json: false,
    overwrite: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      return configuration(on, config)
    },
    specPattern: '**/e2e/**/*.feature',
    supportFile: './cypress/support/e2e.ts',
    chromeWebSecurity: false
  }
})
