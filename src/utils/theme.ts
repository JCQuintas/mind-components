import { createGlobalStyle } from 'styled-components'
import { rhythm, scale } from './typography'

const spacing = (...args: number[]): string => {
  const space = 8
  const a = args[0] || 1
  const b = args[1]
  const c = args[2]
  const d = args[3]
  if (a && b && c && d) return `${a * space}px ${b * space}px ${c * space}px ${d * space}px`
  if (a && b && c) return `${a * space}px ${b * space}px ${c * space}px`
  if (a && b) return `${a * space}px ${b * space}px`
  return `${a * space}px`
}

const defaultTheme = {
  spacing,
  typography: {
    rhythm,
    scale: scale as StyledScale,
  },
}

const generateColor = (color: [number, number, number] | number) => {
  const colorString = typeof color === 'number' ? [color, color, color].join(',') : color.join(',')
  return {
    color: `rgba(${colorString},1)`,
    opacity: (value: number) => `rgba(${colorString},${value})`,
  }
}

export const darkTheme: Theme = {
  ...defaultTheme,
  palette: {
    primary: generateColor(222),
    secondary: generateColor([222, 222, 0]),
    background: generateColor(0),
    contrast: generateColor(222),
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,
  palette: {
    primary: generateColor(222),
    secondary: generateColor([222, 222, 0]),
    background: generateColor(222),
    contrast: generateColor(0),
  },
}

export const GlobalStyle = createGlobalStyle<ST>`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }: ST) => theme.palette.background.color};
    color: ${({ theme }: ST) => theme.palette.contrast.color}
  }

  a {
    color: ${({ theme }: ST) => theme.palette.secondary.color};
  }

  a:hover {
    color: ${({ theme }: ST) => theme.palette.secondary.color};
  }
`
