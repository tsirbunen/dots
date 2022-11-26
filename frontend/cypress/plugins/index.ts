import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import nodePolyfills from '@esbuild-plugins/node-modules-polyfill'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'

const configuration = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [nodePolyfills(), createEsbuildPlugin(config)]
    })
  )
  return config
}

export default configuration
