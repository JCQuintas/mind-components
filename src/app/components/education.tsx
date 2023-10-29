import { FunctionComponent } from 'react'
import styles from './education.module.css'

interface EducationProps {
  institution: string
  start: number
  end: number
  course: string
}

export const Education: FunctionComponent<EducationProps> = ({ institution, start, end, course }) => {
  return (
    <div className={styles.education}>
      <div>
        <span className={styles.glyph}>▷</span>
        <b className={styles.institution}>{institution}</b>
      </div>
      <div className={styles.course}>{course}</div>
      <small className={styles.year}>{`${start} - ${end}`}</small>
    </div>
  )
}
