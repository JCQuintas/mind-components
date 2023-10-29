import Image from 'next/image'
import { FunctionComponent } from 'react'
import { siteData } from '../site-data'
import profilePic from './../profile.png'
import styles from './bio.module.scss'

export const Bio: FunctionComponent = () => {
  return (
    <div className={styles.bio}>
      <Image src={profilePic} alt={siteData.author} className={styles.bioImage} height={64} width={64} />
      <div>
        <div>Hi, this is my personal website and blog.</div>
        <div>
          Find me on{' '}
          <a href={`https://github.com/${siteData.github}`} target="_blank" rel="noopener noreferrer">
            Github
          </a>{' '}
          or{' '}
          <a href={`https://linkedin.com/in/${siteData.linkedIn}`} target="_blank" rel="noopener noreferrer">
            aedIn
          </a>
        </div>
      </div>
    </div>
  )
}
