import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from './theme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ThemeProvider(props: any) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
}

export default ThemeProvider
