import { DefaultTheme, CSSObject } from 'styled-components'

interface Color {
  color: string
  opacity: (value: number) => string
  toHex: () => string
}

interface Palette {
  primary: Color
  secondary: Color
  background: Color
  foreground: Color
  code: {
    background: string
    foreground: string
    keyword: string
    string: string
    class: string
    function: string
    operator: string
    number: string
    comment: string
    selection: string
    punctuation: string
    selector: string
    highlight: string
  }
}

interface StyledTypography {
  rhythm(rhythm?: number, asNumber?: false): string | number
  rhythm(rhythm: number, asNumber: true): string | number
  rhythm(vertical: number, horizontal: number): string | number
  rhythm(top: number, horizontal: number, bottom: number): string | number
  rhythm(top: number, right: number, bottom: number, left: number): string | number
  scale: StyledScale
}

declare global {
  type StyledScale = (values: number) => Pick<CSSObject, 'fontSize' | 'lineHeight'>

  class Theme implements DefaultTheme {
    isDark: boolean
    palette: Palette
    transition(property?: string[] | string, duration?: number, easing?: string): string
    typography: StyledTypography
  }

  type Styled<T extends {} = {}> = T & {
    theme: Theme
  }
}
