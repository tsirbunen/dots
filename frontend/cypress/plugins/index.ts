import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify'
import browserify from '@cypress/browserify-preprocessor'

const configuration = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    preprocessor(config, {
      ...browserify.defaultOptions,
      typescript: require.resolve('typescript')
    })
  )
  return config
}

export default configuration
