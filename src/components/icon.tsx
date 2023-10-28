import { FunctionComponent, SVGProps } from 'react'
import Aws from '../../content/svg/aws.svg'
import Back from '../../content/svg/back.svg'
import Css3 from '../../content/svg/css-3.svg'
import Email from '../../content/svg/email.svg'
import Figma from '../../content/svg/figma.svg'
import Forward from '../../content/svg/forward.svg'
import FramerMotion from '../../content/svg/framer-motion.svg'
import Gcp from '../../content/svg/gcp.svg'
import Git from '../../content/svg/git.svg'
import Github from '../../content/svg/github.svg'
import Html5 from '../../content/svg/html-5.svg'
import Jest from '../../content/svg/jest.svg'
import Linkedin from '../../content/svg/linkedin.svg'
import Location from '../../content/svg/location.svg'
import MobX from '../../content/svg/mobx.svg'
import Moon from '../../content/svg/moon.svg'
import NodeJs from '../../content/svg/node-js.svg'
import Python from '../../content/svg/python.svg'
import ReactJs from '../../content/svg/react-js.svg'
import Sun from '../../content/svg/sun.svg'
import Typescript from '../../content/svg/typescript.svg'
import Web from '../../content/svg/web.svg'

const build = (v: AnyStyledComponent) =>
  styled(v).attrs(() => ({ 'aria-hidden': true }))`
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
  Location: build(Location),
  Aws: build(Aws),
  Css3: build(Css3),
  Gcp: build(Gcp),
  Git: build(Git),
  Html5: build(Html5),
  Jest: build(Jest),
  NodeJs: build(NodeJs),
  Python: build(Python),
  ReactJs: build(ReactJs),
  Typescript: build(Typescript),
  Figma: build(Figma),
  FramerMotion: build(FramerMotion),
  MobX: build(MobX),
}
