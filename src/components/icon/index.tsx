import LocationSvg from '../../../content/svg/location.svg'
import MoonSvg from '../../../content/svg/moon.svg'
import SunSvg from '../../../content/svg/sun.svg'
import styled from 'styled-components'

const build = (v: any) => styled(v)`
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
  Location: build(LocationSvg),
  Sun: build(SunSvg),
  Moon: build(MoonSvg),
}
