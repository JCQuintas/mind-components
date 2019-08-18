import React, { useState, createContext, FunctionComponent, useEffect } from 'react'
import { rhythm, scale } from './typography'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

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
  const colorArray = typeof color === 'number' ? [color, color, color] : color
  const colorString = colorArray.join(',')
  return {
    color: `rgba(${colorString},1)`,
    opacity: (value?: number) => `rgba(${colorString},${typeof value === 'number' ? value : 1})`,
    toHex: () => `#${colorArray.map(v => `0${v.toString(16)}`.slice(-2)).join('')}`,
  }
}

export const darkTheme: Theme = {
  ...defaultTheme,
  isDark: true,
  palette: {
    primary: generateColor([240, 113, 120]),
    secondary: generateColor([195, 232, 141]),
    background: generateColor([6, 28, 35]),
    foreground: generateColor(244),
    code: {
      background: 'rgba(0, 0, 0, 0.3)',
      foreground: generateColor([240, 113, 120]).color,
      keyword: '#c678dd',
      string: '#98c379',
      function: '#61afef',
      operator: '#56b6c2',
      number: '#d19a66',
      comment: '#5c6370',
      selection: '#9aa2b1',
      punctuation: '#abb2bf',
      selector: '#e06c75',
      highlight: generateColor([195, 232, 141]).opacity(0.05),
    },
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,
  isDark: false,
  palette: {
    primary: generateColor([255, 83, 112]),
    secondary: generateColor([120, 187, 27]),
    background: generateColor(252),
    foreground: generateColor(2),
    code: {
      background: '#faf4f0',
      foreground: generateColor([255, 83, 112]).color,
      keyword: '#c678dd',
      string: '#77b82e',
      function: '#61afef',
      operator: '#56b6c2',
      number: '#d97d26',
      comment: '#999988',
      selection: 'rgba(0,0,0,0.1)',
      punctuation: '#abb2bf',
      selector: '#e06c75',
      highlight: generateColor([195, 232, 141]).opacity(0.2),
    },
  },
}

// Key used to save into LocalStorage
export const darkModeKey = `${process.env.GATSBY_PROJECT_ID}_IS_DARK_MODE`

// Get dark mode setting from LocalStorage
const savedIsDarkMode = () => typeof window !== 'undefined' && `${localStorage.getItem(darkModeKey)}`
// Check if browser preffers Dark Mode
const supportsDarkMode = () =>
  typeof window !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)').matches : true

// Get usabled isDarkMode
export const getIsDarkMode = (): boolean =>
  // Checks if user has a preference already set and use it
  // If not set, then try to select mode by detecting system preference
  savedIsDarkMode() === 'true' ? true : savedIsDarkMode() === 'false' ? false : supportsDarkMode()

// The ThemeModeContext can be imported and used on useContext
// in order to use setIsDarkMode from whithin the app
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
                content: mode.theme.palette.secondary.color,
              },
            ]}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
