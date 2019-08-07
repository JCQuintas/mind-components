import { createGlobalStyle } from 'styled-components'
import { rhythm, scale } from './typography'

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
    primary: generateColor([0, 0, 222]),
    secondary: generateColor([222, 222, 0]),
    background: generateColor(0),
    foreground: generateColor(222),
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,
  isDark: false,
  palette: {
    primary: generateColor([0, 0, 222]),
    secondary: generateColor([222, 222, 0]),
    background: generateColor(222),
    foreground: generateColor(0),
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
