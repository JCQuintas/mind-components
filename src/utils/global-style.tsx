import { createGlobalStyle, withTheme } from 'styled-components'
import { createElement } from 'react'
import { prismCss } from './theme-style'

const GlobalStyle = createGlobalStyle<Styled>`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }: Styled) => theme.palette.background.color};
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    transition: ${({ theme }: Styled) => theme.transition(['color', 'background-color'])};
  }

  a {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
  }

  h1, h2, h3, h4, h5 {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};

    a {
      color: inherit;
      transition: none;
    }
  }

  ${prismCss}
`

export const GlobalStylesComponent = withTheme(({ theme }: Styled) => createElement(GlobalStyle, { theme }))
