import { css } from 'styled-components'

export const vscodeStyle = css`
  .vscode-highlight {
    --vscode-highlight-line-highlighted-background-color: ${({ theme }) => theme.palette.code.highlight};
    --vscode-highlight-line-highlighted-border-color: ${({ theme }) => theme.palette.primary.color};
    --vscode-highlight-padding-left: 1rem;
    --vscode-highlight-padding-right: 1rem;
  }

  .vscode-highlight.vscode-block {
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
