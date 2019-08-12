import React, { createElement, useState, createContext, FunctionComponent, useEffect } from 'react'
import { rhythm, scale } from './typography'
import { createGlobalStyle, withTheme, ThemeProvider } from 'styled-components'

const transition = (
  property: string[] | string = 'all',
  duration: number = 250,
  easing: string = 'cubic-bezier(0.4,0,0.2,1)'
) => {
  if (typeof property === 'string') return `${property} ${duration}ms ${easing}`
  return property.map(v => `${v} ${duration}ms ${easing}`).join(', ')
}

const defaultTheme = {
  transition,
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
    primary: generateColor([195, 232, 141]),
    secondary: generateColor([240, 113, 120]),
    background: generateColor([6, 28, 35]),
    foreground: generateColor(200),
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,
  isDark: false,
  palette: {
    primary: generateColor([92, 143, 20]),
    secondary: generateColor([255, 83, 112]),
    background: generateColor(255),
    foreground: generateColor(2),
  },
}

export const GlobalStyle = createGlobalStyle<Styled>`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }: Styled) => theme.palette.background.color};
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    transition: ${({ theme }: Styled) => theme.transition(['color', 'background-color'])};
  }

  a {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
  }

  h1, h2, h3, h4, h5 {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};

    a {
      color: inherit;
      transition: none;
    }
  }
`

// Key used to save into LocalStorage
const DarkModeKey = `${process.env.GATSBY_PROJECT_ID}_IS_DARK_MODE`
const savedIsDarkMode = `${localStorage.getItem(DarkModeKey)}`

const initalIsDarkMode: boolean =
  // Checks if user has a preference already set and use it
  // If not set, then try to select mode by detecting system preference
  savedIsDarkMode === 'true'
    ? true
    : savedIsDarkMode === 'false'
    ? false
    : matchMedia('(prefers-color-scheme: dark)').matches

// The DarkModeContext can be imported and used on useContext
// in order to use setIsDarkMode from whithin the app
export const DarkModeContext = createContext<{
  theme: Theme
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}>({
  theme: initalIsDarkMode ? darkTheme : lightTheme,
  setIsDarkMode: () => {},
})

export const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(initalIsDarkMode)

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
