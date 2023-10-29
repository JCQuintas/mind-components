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
            <Link href={item.path} className={clsx(styles.link, { [styles.active]: activePath === item.path })}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
