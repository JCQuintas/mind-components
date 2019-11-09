import { SVGProps, FunctionComponent } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'
// import LocationSvg from '../../content/svg/location.svg'
import Back from '../../content/svg/back.svg'
import Forward from '../../content/svg/forward.svg'
import Moon from '../../content/svg/moon.svg'
import Sun from '../../content/svg/sun.svg'
import Email from '../../content/svg/email.svg'
import Github from '../../content/svg/github.svg'
import Linkedin from '../../content/svg/linkedin.svg'
import Web from '../../content/svg/web.svg'

const build = (v: AnyStyledComponent) =>
  styled(v).attrs({ 'aria-hidden': true })`
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1em;
    transition: ${({ theme }) => theme.transition(['color', 'fill'], 200)};
    user-select: none;
    flex-shrink: 0;
  ` as FunctionComponent<SVGProps<SVGSVGElement>>

export const Icon = {
  Back: build(Back),
  Forward: build(Forward),
  Moon: build(Moon),
  Sun: build(Sun),
  Email: build(Email),
  Github: build(Github),
  Linkedin: build(Linkedin),
  Web: build(Web),
}
