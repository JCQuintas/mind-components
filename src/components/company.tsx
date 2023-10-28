import clsx from 'clsx'
import { FunctionComponent, ReactNode } from 'react'
import styles from './company.module.css'

interface CompanyProps {
  position: string
  company: string
  period: string
  website: string
  children: ReactNode
}

export const Company: FunctionComponent<CompanyProps> = ({ position, company, period, website, children }) => {
  return (
    <>
      <div className={styles.company}>
        <div className={styles.position}>{position}</div>
        <a href={website} className={clsx(styles.place, styles.small)} target="_blank" rel="noopener noreferrer">
          {company}
        </a>
        <div className={clsx(styles.timePeriod, styles.small)}>{period}</div>
      </div>
      <p className={styles.description}>{children}</p>
    </>
  )
}
