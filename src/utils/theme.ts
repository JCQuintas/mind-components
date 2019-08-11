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
    background: generateColor([9, 42, 53]),
    foreground: generateColor([248, 238, 180]),
  },
}
