import { useContext } from 'react'
import { scale } from './typography'
import { ThemeContext, DefaultTheme } from 'styled-components'
import { generateBreakpoint, generateTransition, generateColor, generateSpacing } from 'style-genie'

const defaultTheme: Omit<DefaultTheme, 'isDark' | 'palette'> = {
  transition: generateTransition(),
  breakpoint: generateBreakpoint(),
  scale,
  spacing: generateSpacing({
    increment: 1.75,
    unit: 'rem',
  }),
}

const darkColor = generateColor([6, 28, 35])
const lightColor = generateColor(244)

const darkPalette: Omit<DefaultTheme['palette'], 'code'> = {
  primary: generateColor([240, 113, 120]),
  secondary: generateColor([195, 232, 141]),
  background: darkColor,
  foreground: lightColor,
}

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  isDark: true,
  palette: {
    ...darkPalette,
    code: {
      background: 'hsla(0, 0%, 0%, 0.3)',
      foreground: darkPalette.foreground.manipulate({ opacity: 0.8 }),
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
      highlight: darkPalette.secondary.manipulate({ opacity: 0.05 }),
    },
  },
}

export const useThemeContext = () => {
  const context = useContext<DefaultTheme>(ThemeContext)
  return context
}
