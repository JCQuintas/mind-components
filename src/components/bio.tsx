import Image from 'next/image'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import { siteData } from '../site-data'
import profilePic from './../profile.png'
import styles from './bio.module.scss'

const Url: FunctionComponent<AnchorHTMLAttributes<'a'>> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export const Bio: FunctionComponent = () => {
  return (
    <div className={styles.bio}>
      <Image src={profilePic} alt={siteData.author} className={styles.bioImage} height={64} width={64} />
      <div>
        <div>Hi, this is my personal website and blog.</div>
        <div>
          Find me on <Url href={`https://github.com/${siteData.github}`}>Github</Url> or{' '}
          <Url href={`https://linkedin.com/in/${siteData.linkedIn}`}>LinkedIn</Url>
        </div>
      </div>
    </div>
  )
}
