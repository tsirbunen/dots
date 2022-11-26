import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeProvider from '../theme/theme-provider'
import { AppStateContextProvider } from '../state/state-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStateContextProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppStateContextProvider>
  )
}
