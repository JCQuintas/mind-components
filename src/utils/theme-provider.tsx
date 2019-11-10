import React, { FunctionComponent, useState, useEffect } from 'react'
import { getIsDarkMode, setIsDarkModeStorage, ThemeModeContext } from './theme-mode'
import { darkTheme, lightTheme } from './theme'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    setIsDarkMode(getIsDarkMode())
    setRendered(true)
  }, [])

  useEffect(() => {
    rendered && setIsDarkModeStorage(isDarkMode)
  }, [isDarkMode])

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeModeContext.Provider value={{ setIsDarkMode }}>
      <StyledThemeProvider theme={theme}>
        <>
          <Helmet
            meta={[
              {
                name: 'theme-color',
                content: theme.palette.background.color,
              },
            ]}
          />
          {children}
        </>
      </StyledThemeProvider>
    </ThemeModeContext.Provider>
  )
}
