import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeProvider from '../theme/theme-provider'
import { AppStateContextProvider } from '../state/state-context'
import { ApolloProvider } from '@apollo/client'
import { graphqlClient } from '../graphql-client/graphql-client'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={graphqlClient}>
      <AppStateContextProvider>
        <ThemeProvider>
          <Toaster position="bottom-center" />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppStateContextProvider>
    </ApolloProvider>
  )
}
