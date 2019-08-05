import { DefaultTheme, CSSObject } from 'styled-components'
import Typography from 'typography'

interface Color {
  color: string
  opacity: (value: number) => string
}

interface Palette {
  primary: Color
  secondary: Color
  background: Color
  contrast: Color
}

declare global {
  type StyledScale = (values: number) => CSSObject

  class Theme implements DefaultTheme {
    isDark?: boolean
    palette: Palette
    spacing(spacing?: number): string
    spacing(vertical: number, horizontal: number): string
    spacing(top: number, horizontal: number, bottom: number): string
    spacing(top: number, right: number, bottom: number, left: number): string
    typography: Pick<Typography, 'rhythm'> & { scale: StyledScale }
  }

  type ST<T extends {} = {}> = T & {
    theme: Theme
  }
}
