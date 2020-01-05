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
      inlineBackground: lightColor.opacity(0.1),
      highlight: darkPalette.secondary.opacity(0.05),
    },
  },
}

export const useThemeContext = () => {
  const context = useContext<DefaultTheme>(ThemeContext)
  return context
}
