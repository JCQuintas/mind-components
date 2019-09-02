import { useContext } from 'react'
import { rhythm, scale } from './typography'
import { ThemeContext } from 'styled-components'
import { createBreakpoints } from './create-breakpoints'
import { transition } from './transition'

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

export const useThemeContext = () => {
  const context = useContext<Theme>(ThemeContext)
  return context
}
