import { FunctionComponent, SVGProps } from 'react'
import styles from './icon.module.css'

import clsx from 'clsx'
import Aws from './aws'
import Back from './back'
import Css3 from './css-3'
import Docker from './docker'
import Email from './email'
import Figma from './figma'
import Forward from './forward'
import FramerMotion from './framer-motion'
import Gcp from './gcp'
import Git from './git'
import Github from './github'
import GoLang from './golang'
import Graphql from './graphql'
import Html5 from './html-5'
import Jest from './jest'
import LinkedIn from './linkedin'
import Location from './location'
import MobX from './mobx'
import Mongodb from './mongodb'
import Moon from './moon'
import NestJs from './nest-js'
import NodeJs from './node-js'
import Postgres from './postgresql'
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
      className: clsx(styles.icon, props.className),
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
  Docker: build(Docker),
  GoLang: build(GoLang),
  Graphql: build(Graphql),
  Mongodb: build(Mongodb),
  NestJs: build(NestJs),
  Postgres: build(Postgres),
}
