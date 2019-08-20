import { css } from 'styled-components'

export const codeStyle = css`
  pre.one-dark-pro {
    background-color: ${({ theme }: Styled) => theme.palette.code.background};
  }
  .vscode-highlight .vscode-highlight-line-highlighted {
    background-color: ${({ theme }: Styled) => theme.palette.code.highlight};
    box-shadow: inset 2px 0 0 0 ${({ theme }: Styled) => theme.palette.primary.color};
  }
`
