import { AppProps } from '@wppopen/core'
import { OsProvider } from '@wppopen/react'
import { StrictMode } from 'react'

import { App } from 'app/App'

export const Root = (props: AppProps) => (
  <StrictMode>
    <OsProvider {...props}>
      <App />
    </OsProvider>
  </StrictMode>
)
