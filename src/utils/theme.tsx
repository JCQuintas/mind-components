import React, { useState, createContext, FunctionComponent, useEffect } from 'react'
import { rhythm, scale } from './typography'
import { ThemeProvider } from 'styled-components'

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
    primary: generateColor([195, 232, 141]),
    secondary: generateColor([240, 113, 120]),
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
    primary: generateColor([92, 143, 20]),
    secondary: generateColor([255, 83, 112]),
    background: generateColor(255),
    foreground: generateColor(2),
    code: {
      background: '#fdfaf6',
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

// The ThemeModeContext can be imported and used on useContext
// in order to use setIsDarkMode from whithin the app
export const ThemeModeContext = createContext<{
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
    <ThemeModeContext.Provider value={mode}>
      <ThemeProvider theme={mode.theme}>{children as any}</ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
