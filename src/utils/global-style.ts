import { createGlobalStyle, withTheme } from 'styled-components'
import { createElement } from 'react'
import { codeStyle } from './code-style'

const GlobalStyle = createGlobalStyle<Styled>`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }: Styled) => theme.palette.background.color};
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    transition: ${({ theme }: Styled) => theme.transition(['color', 'background-color'])};
    font-weight: ${({ theme }: Styled) => (theme.isDark ? 400 : 500)};
  }

  a {
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};
    text-decoration: none;
    box-shadow: 0 1px 0 0 currentColor;

    &:hover {
      box-shadow: none;
    }
  }

  a.anchor {
    fill: ${({ theme }: Styled) => theme.palette.foreground.color};
    box-shadow: none;

    &:hover {
      fill: ${({ theme }: Styled) => theme.palette.primary.color};
    }
  }

  a:hover {
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
  }

  h1 {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
  }

  h2, h3, h4, h5 {
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
  }

  h1, h2, h3, h4, h5 {
    transition: ${({ theme }: Styled) => theme.transition('color')};

    a {
      color: inherit;
      transition: none;

      &:hover {
        color: inherit;
      }
    }
  }

  hr {
    background-color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
  }

  th, td {
    border-color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
  }

  :not(pre) > code {
    padding: 0.3em 0.5em 0.4em;
    border-radius: 0.4em;
    margin: 0.5em 0;
    overflow: auto;
    background-color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  ${codeStyle}
`

export const GlobalStylesComponent = withTheme(({ theme }: Styled) => createElement(GlobalStyle, { theme }))
