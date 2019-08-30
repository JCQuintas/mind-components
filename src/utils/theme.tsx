import React, { useState, createContext, FunctionComponent, useEffect } from 'react'
import { rhythm, scale } from './typography'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import { createBreakpoints } from './breakpoints'

const transition = (
  property: string[] | string = 'all',
  duration: number = 250,
  easing: string = 'cubic-bezier(0.4,0,0.2,1)'
) => {
  if (typeof property === 'string') return `${property} ${duration}ms ${easing}`
  return property.map(v => `${v} ${duration}ms ${easing}`).join(', ')
}

const defaultTheme: Omit<Theme, 'isDark' | 'palette'> = {
  transition,
  breakpoint: createBreakpoints(),
  typography: {
    rhythm,
    scale: scale as StyledScale,
  },
}

const generateColor = (color: [number, number, number] | number) => {
  const colorArray = typeof color === 'number' ? [color, color, color] : color
  const colorString = colorArray.join(',')
  return {
    color: `rgba(${colorString},1)`,
    opacity: (value?: number) => `rgba(${colorString},${typeof value === 'number' ? value : 1})`,
    toHex: () => `#${colorArray.map(v => `0${v.toString(16)}`.slice(-2)).join('')}`,
  }
}

const darkColor = generateColor([6, 28, 35])
const lightColor = generateColor(244)

const darkPalette: Omit<Theme['palette'], 'code'> = {
  primary: generateColor([240, 113, 120]),
  secondary: generateColor([195, 232, 141]),
  background: darkColor,
  foreground: lightColor,
}

export const darkTheme: Theme = {
  ...defaultTheme,
  isDark: true,
  palette: {
    ...darkPalette,
    code: {
      background: 'hsla(0, 0%, 0%, 0.3)',
      foreground: darkPalette.foreground.opacity(0.8),
      keyword: 'hsla(286, 60%, 67%, 1)',
      string: 'hsla(95, 38%, 62%, 1)',
      class: 'hsla(39, 67%, 69%, 1)',
      function: 'hsla(207, 82%, 66%, 1)',
      operator: 'hsla(187, 47%, 55%, 1)',
      number: 'hsla(29, 54%, 61%, 1)',
      comment: 'hsla(219, 10%, 40%, 1)',
      selection: 'hsla(219, 13%, 65%, 1)',
      punctuation: 'hsla(219, 14%, 71%, 1)',
      selector: 'hsla(355, 65%, 65%, 1)',
      highlight: darkPalette.secondary.opacity(0.05),
    },
  },
}

const lightPalette: Omit<Theme['palette'], 'code'> = {
  primary: generateColor([255, 83, 112]),
  secondary: generateColor([120, 187, 27]),
  background: lightColor,
  foreground: darkColor,
}

export const lightTheme: Theme = {
  ...defaultTheme,
  isDark: false,
  palette: {
    ...lightPalette,
    code: {
      background: 'hsla(0, 0%, 0%, 0.05)',
      foreground: lightPalette.foreground.opacity(0.8),
      keyword: 'hsla(286, 70%, 47%, 1)',
      string: 'hsla(95, 48%, 42%, 1)',
      class: 'hsla(60, 100%, 29%, 1)',
      function: 'hsla(207, 92%, 46%, 1)',
      operator: 'hsla(187, 57%, 35%, 1)',
      number: 'hsla(25, 80%, 61%, 1)',
      comment: 'hsla(219, 20%, 20%, 1)',
      selection: 'hsla(219, 23%, 90%, 1)',
      punctuation: 'hsla(219, 24%, 51%, 1)',
      selector: 'hsla(355, 75%, 45%, 1)',
      highlight: 'hsla(0, 0%, 0%, 0.05)',
    },
  },
}

// Key used to save into LocalStorage
export const darkModeKey = `${process.env.GATSBY_PROJECT_ID}_IS_DARK_MODE`

// Get dark mode setting from LocalStorage
const savedIsDarkMode = () => typeof window !== 'undefined' && `${localStorage.getItem(darkModeKey)}`
// Check if browser prefers Dark Mode
const supportsDarkMode = () =>
  typeof window !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)').matches : true

// Get usable isDarkMode
export const getIsDarkMode = (): boolean =>
  // Checks if user has a preference already set and use it
  // If not set, then try to select mode by detecting system preference
  savedIsDarkMode() === 'true' ? true : savedIsDarkMode() === 'false' ? false : supportsDarkMode()

// The ThemeModeContext can be imported and used on useContext
// in order to use setIsDarkMode from within the app
export const ThemeModeContext = createContext<{
  theme: Theme
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}>({
  theme: getIsDarkMode() ? darkTheme : lightTheme,
  setIsDarkMode: () => {},
})

export const ThemeModeProvider: FunctionComponent<{ children: any }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode())

  useEffect(() => {
    localStorage.setItem(darkModeKey, JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const mode = { theme: isDarkMode ? darkTheme : lightTheme, setIsDarkMode }
  return (
    <ThemeModeContext.Provider value={mode}>
      <ThemeProvider theme={mode.theme}>
        <>
          <Helmet
            meta={[
              {
                name: 'theme-color',
                content: mode.theme.palette.primary.color,
              },
            ]}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
