import React, { createElement, useState, createContext, FunctionComponent, useEffect } from 'react'
import { rhythm, scale } from './typography'
import { createGlobalStyle, withTheme, ThemeProvider } from 'styled-components'

const defaultTheme = {
  typography: {
    rhythm,
    scale: scale as StyledScale,
  },
}

const generateColor = (color: [number, number, number] | number) => {
  const colorString = typeof color === 'number' ? [color, color, color].join(',') : color.join(',')
  return {
    color: `rgba(${colorString},1)`,
    opacity: (value?: number) => `rgba(${colorString},${typeof value === 'number' ? value : 1})`,
  }
}

export const darkTheme: Theme = {
  ...defaultTheme,
  isDark: true,
  palette: {
    primary: generateColor([101, 133, 37]),
    secondary: generateColor([207, 238, 145]),
    background: generateColor([9, 42, 53]),
    foreground: generateColor([248, 238, 180]),
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,
  isDark: false,
  palette: {
    primary: generateColor([101, 133, 37]),
    secondary: generateColor([207, 238, 145]),
    background: generateColor(255),
    foreground: generateColor([248, 238, 180]),
  },
}

export const GlobalStyle = createGlobalStyle<Styled>`
  html, body {
    height: 100%;
  }

  body {
      background-color: ${({ theme }: Styled) => theme.palette.background.color};
      color: ${({ theme }: Styled) => theme.palette.foreground.color}
    }

    a {
      color: ${({ theme }: Styled) => theme.palette.secondary.color};
    }

    a:hover {
      color: ${({ theme }: Styled) => theme.palette.secondary.color};
    }
`

// Key used to save into LocalStorage
const DarkModeKey = `${process.env.GATSBY_PROJECT_ID}_IS_DARK_MODE`

const savedIsDarkMode: boolean =
  // Checks if user has a preference already set and use it
  (localStorage.getItem(DarkModeKey)
    ? JSON.parse(localStorage.getItem(DarkModeKey)!)
    : // If not set, then try to select mode by detecting system preference
      matchMedia('(prefers-color-scheme: dark)').matches) ||
  // defaults to dark
  true

// The DarkModeContext can be imported and used on useContext
// in order to use setIsDarkMode from whithin the app
export const DarkModeContext = createContext<{
  theme: Theme
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}>({
  theme: savedIsDarkMode ? darkTheme : lightTheme,
  setIsDarkMode: () => {},
})

export const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode)

  useEffect(() => {
    localStorage.setItem(DarkModeKey, JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const mode = isDarkMode ? { theme: darkTheme, setIsDarkMode } : { theme: lightTheme, setIsDarkMode }
  return (
    <DarkModeContext.Provider value={mode}>
      <ThemeProvider theme={mode.theme}>{children as any}</ThemeProvider>
    </DarkModeContext.Provider>
  )
}

export const GlobalStylesComponent = withTheme(({ theme }: Styled) => createElement(GlobalStyle, { theme }))
