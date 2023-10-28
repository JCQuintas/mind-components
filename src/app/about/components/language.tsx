import { FunctionComponent } from 'react'
import styles from './language.module.css'

interface LanguageProps {
  name: string
  level: 'native' | 'fluent' | 'conversational'
}

export const Language: FunctionComponent<LanguageProps> = ({ name, level }) => {
  return (
    <div className={styles.language}>
      <span className={styles.glyph}>◇</span>
      <b>{name}</b> - <span className={styles.level}>{level}</span>
    </div>
  )
}
