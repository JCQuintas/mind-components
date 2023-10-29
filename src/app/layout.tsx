import clsx from 'clsx'
import type { Metadata } from 'next'
import { Poppins, Raleway, Ubuntu_Mono } from 'next/font/google'
import { siteData } from '../site-data'
import './globals.css'

const poppins = Poppins({ weight: '800', subsets: ['latin', 'latin-ext'], variable: '--font-heading' })
const raleway = Raleway({ subsets: ['latin', 'latin-ext'], variable: '--font-body' })
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-code', weight: '400' })

export const metadata: Metadata = {
  title: siteData.title,
  description: `A personal blog and portfolio by ${siteData.author}.`,
  keywords: ['jose quintas', 'mindcomponents', 'blog', 'portfolio', 'curriculum'],
  robots: 'index, follow',
  authors: [
    {
      name: siteData.author,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(raleway.variable, poppins.variable, ubuntuMono.variable)}>
        {children}
        <footer>Last migrated to a new JS framework on Oct/2023, may I never have to do this again.</footer>
      </body>
    </html>
  )
}
