import LocationSvg from '../../../content/svg/location.svg'
import styled, { css } from 'styled-components'

const styles = css`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 24px;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  flex-shrink: 0;
`

export const Icon = {
  Location: styled(LocationSvg)`
    ${styles}
  `,
}
