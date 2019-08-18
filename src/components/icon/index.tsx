import LocationSvg from '../../../content/svg/location.svg'
import MoonSvg from '../../../content/svg/moon.svg'
import SunSvg from '../../../content/svg/sun.svg'
import styled from 'styled-components'

const build = (v: any) => styled(v)`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1em;
  transition: ${({ theme }: Styled) => theme.transition(['color', 'fill'], 200)};
  user-select: none;
  flex-shrink: 0;
`

export const Icon = {
  Location: build(LocationSvg),
  Sun: build(SunSvg),
  Moon: build(MoonSvg),
}
