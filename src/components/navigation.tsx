import Link from 'next/link'
import { FunctionComponent } from 'react'
import './navigation.css'

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
    <nav>
      <ul>
        {navigation.map((item) => (
          <li key={item.path}>
            {activePath === item.path ? (
              <span className="link active">{item.label}</span>
            ) : (
              <Link href={item.path} className="link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
