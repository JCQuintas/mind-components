import { FunctionComponent } from 'react'
import { Icon } from '../../../components/icon/icon'
import { siteData } from '../../../site-data'
import styles from './social.module.css'

export const Social: FunctionComponent = () => {
  return (
    <div className={styles.social}>
      <div className={styles.location}>
        <a href={`https://www.google.com.br/maps?q=amsterdam`} target="_blank" rel="noopener noreferrer">
          <Icon.Location />
          {`Amsterdam`}
        </a>
      </div>
      <div className={styles.platforms}>
        <a href={`mailto:${siteData.email}`}>
          <Icon.Email />
          {siteData.email}
        </a>
        <a href={`https://github.com/${siteData.github}`} target="_blank" rel="noopener noreferrer">
          <Icon.Github />
          {siteData.github}
        </a>
        <a href={`https://linkedin.com/in/${siteData.linkedIn}`} target="_blank" rel="noopener noreferrer">
          <Icon.LinkedIn />
          {siteData.linkedIn}
        </a>
      </div>
    </div>
  )
}
