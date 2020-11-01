import { css } from 'styled-components'

export const vscodeStyle = css`
  .grvsc-container {
    --grvsc-line-highlighted-background-color: ${({ theme }) => theme.palette.code.highlight};
    --grvsc-line-highlighted-border-color: ${({ theme }) => theme.palette.primary.color};
    --grvsc-padding-left: 1rem;
    --grvsc-padding-right: 1rem;
  }

  .grvsc-container.vscode-block {
    background-color: ${({ theme }) => theme.palette.code.background};

    code {
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }

  :not(pre) > code {
    background-color: ${({ theme }) => theme.palette.code.inlineBackground};

    font-size: 1rem;
    line-height: 1.75rem;
    color: ${({ theme }) => theme.palette.foreground.color};
    white-space: normal;
    padding: 0.2em 0.3em;
    border-radius: 0.5em;
  }

  code {
    font-family: 'Ubuntu Mono', Consolas, Monaco, 'Andale Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    overflow-wrap: normal;
    tab-size: 4;
    hyphens: none;
    background: none;

    & * {
      font-style: normal !important;
    }
  }
`
