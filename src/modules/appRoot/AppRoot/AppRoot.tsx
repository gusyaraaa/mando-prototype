import { StrictMode } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { RouterRoot } from 'modules/router/ui/RouterRoot'
import { ThemeProvider } from 'modules/themes/ThemeProvider'
import { ScrollRestorator } from 'shared/ui/utils/ScrollRestorator'

import 'modules/appRoot/fonts.scss'
import 'modules/appRoot/global-styles.scss'

export function AppRoot() {
  return (
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollRestorator />
          <RouterRoot />
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  )
}
