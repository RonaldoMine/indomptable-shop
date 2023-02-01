import '../styles/globals.css'
import '../styles/responsive.css'
import type { AppProps } from 'next/app'
import { BasketContextProvider } from '../src/context/BasketContext'

export default function App({ Component, pageProps }: AppProps) {
  return <BasketContextProvider>
    <Component {...pageProps} />
  </BasketContextProvider>
}
