import React, { FunctionComponent } from 'react'
import { darkTheme } from './theme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeProvider: FunctionComponent = ({ children }) => (
  <StyledThemeProvider theme={darkTheme}>
    <>{children}</>
  </StyledThemeProvider>
)
