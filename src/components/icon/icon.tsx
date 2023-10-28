import { FunctionComponent, SVGProps } from 'react'
import styles from './icon.module.css'

import Aws from './aws'
import Back from './back'
import Css3 from './css-3'
import Email from './email'
import Figma from './figma'
import Forward from './forward'
import FramerMotion from './framer-motion'
import Gcp from './gcp'
import Git from './git'
import Github from './github'
import Html5 from './html-5'
import Jest from './jest'
import LinkedIn from './linkedin'
import Location from './location'
import MobX from './mobx'
import Moon from './moon'
import NodeJs from './node-js'
import Python from './python'
import ReactJs from './react-js'
import Sun from './sun'
import Typescript from './typescript'
import Web from './web'

const build =
  (v: FunctionComponent<SVGProps<SVGSVGElement>>): FunctionComponent<SVGProps<SVGSVGElement>> =>
  (props) =>
    v({
      'aria-hidden': true,
      ...props,
      className: `${styles.icon} ${props.className || ''}`,
    })

export const Icon = {
  Back: build(Back),
  Forward: build(Forward),
  Moon: build(Moon),
  Sun: build(Sun),
  Email: build(Email),
  Github: build(Github),
  LinkedIn: build(LinkedIn),
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
