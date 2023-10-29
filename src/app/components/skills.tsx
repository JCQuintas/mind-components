import { FunctionComponent } from 'react'
import { Icon } from '../../components/icon/icon'
import styles from './skills.module.css'

export const Skills: FunctionComponent = () => {
  return (
    <ul className={styles.skills}>
      <li>
        <Icon.Typescript />
        Typescript
      </li>
      <li>
        <Icon.ReactJs />
        React
      </li>
      <li>
        <Icon.NodeJs />
        NodeJS
      </li>
      <li>
        <Icon.Figma />
        Figma
      </li>
      <li>
        <Icon.Jest />
        Jest
      </li>
      <li>
        <Icon.MobX />
        MobX
      </li>
      <li>
        <Icon.FramerMotion />
        Framer Motion
      </li>
      <li>
        <Icon.Html5 />
        HTML 5
      </li>
      <li>
        <Icon.Css3 />
        CSS 3
      </li>
      <li>
        <Icon.Gcp />
        GCP
      </li>
      <li>
        <Icon.Aws />
        AWS
      </li>
      <li>
        <Icon.Git />
        Git
      </li>
    </ul>
  )
}
