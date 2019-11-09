import { CSSObject } from 'styled-components'
import { Color, Breakpoint, Spacing, Transition } from 'style-genie'

declare module 'styled-components' {
  export interface DefaultTheme {
    isDark: boolean
    palette: {
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
    breakpoint: Breakpoint
    spacing: Spacing
    transition: Transition
    scale: (values: number) => Pick<CSSObject, 'fontSize' | 'lineHeight'>
  }
}
