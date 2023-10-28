import clsx from 'clsx'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import styles from './navigation.module.css'

export type NavigationProps = {
  activePath: string
}

export const Navigation: FunctionComponent<NavigationProps> = ({ activePath }) => {
  const navigation = [
    {
      label: 'Blog',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
  ]

  return (
    <nav className={styles.navigation}>
      <ul>
        {navigation.map((item) => (
          <li key={item.path}>
            {activePath === item.path ? (
              <span className={clsx(styles.link, styles.active)}>{item.label}</span>
            ) : (
              <Link href={item.path} className={styles.link}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
