import { css } from 'styled-components'

export const codeStyle = css`
  /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

  code[class*='language-'],
  pre[class*='language-'] {
    color: ${({ theme }) => theme.palette.code.foreground};
    background: none;
    font-family: 'Ubuntu Mono', Consolas, Monaco, 'Andale Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  pre[class*='language-']::selection,
  span[class*='token']::selection,
  span[class*='gatsby-highlight-code-line']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: ${({ theme }) => theme.palette.code.selection};
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    ${({ theme }) => theme.scale(0)};
    color: ${({ theme }) => theme.palette.foreground.color};
    padding: 0.2em 0.3em;
    border-radius: 0.5em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${({ theme }) => theme.palette.code.comment};
  }

  .token.punctuation {
    color: ${({ theme }) => theme.palette.code.punctuation};
  }

  .token.selector,
  .token.tag {
    color: ${({ theme }) => theme.palette.code.selector};
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.attr-name,
  .token.deleted {
    color: ${({ theme }) => theme.palette.code.number};
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.builtin,
  .token.inserted {
    color: ${({ theme }) => theme.palette.code.string};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${({ theme }) => theme.palette.code.operator};
  }

  .token.atrule,
  .token.keyword {
    color: ${({ theme }) => theme.palette.code.keyword};
  }

  .token.function {
    color: ${({ theme }) => theme.palette.code.function};
  }

  .token.class-name {
    color: ${({ theme }) => theme.palette.code.class};
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: ${({ theme }) => theme.palette.code.keyword};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre.line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 0;

    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: ${({ theme }) => theme.palette.code.comment};
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  .gatsby-highlight-code-line {
    background-color: ${({ theme }) => theme.palette.code.highlight};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${({ theme }) => theme.palette.primary.color};

    ${({ theme }) => theme.breakpoint.down.xs} {
      margin-right: -2em;
    }
  }

  .gatsby-highlight {
    background-color: ${({ theme }) => theme.palette.code.background};
    border-radius: 0.3em;
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;

    ${({ theme }) => theme.breakpoint.down.xs} {
      padding-right: 1em;
    }
  }
`
