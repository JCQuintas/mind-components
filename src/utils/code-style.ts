import { css } from 'styled-components'

export const codeStyle = css`
  pre.vscode-highlight {
    background-color: ${({ theme }: Styled) => theme.palette.code.background};

    span,
    code {
      line-height: 1.65em;
    }

    & *::selection {
      color: inherit;
      background-color: ${({ theme }: Styled) => theme.palette.secondary.opacity(0.1)};
      line-height: 1.65em;
      height: 1.65em;
    }
  }

  .vscode-highlight .vscode-highlight-line-highlighted {
    background-color: ${({ theme }: Styled) => theme.palette.code.highlight};
    box-shadow: inset 2px 0 0 0 ${({ theme }: Styled) => theme.palette.primary.color};
  }
`
