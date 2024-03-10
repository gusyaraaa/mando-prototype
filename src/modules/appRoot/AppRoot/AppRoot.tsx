import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { RouterRoot } from 'modules/router/ui/RouterRoot'
import { ThemeProvider } from 'modules/themes/ThemeProvider'
import { ScrollRestorator } from 'shared/ui/utils/ScrollRestorator'
import { config } from '../config'

import 'modules/appRoot/fonts.scss'
import 'modules/appRoot/global-styles.scss'

const queryClient = new QueryClient()

export function AppRoot() {
  return (
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BrowserRouter>
              <ScrollRestorator />
              <RouterRoot />
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  )
}
