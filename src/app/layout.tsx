import clsx from 'clsx'
import type { Metadata } from 'next'
import { Poppins, Raleway, Ubuntu_Mono } from 'next/font/google'
import Script from 'next/script'
import { fillMetadata } from '../fill-metadata'
import { siteData } from '../site-data'
import './globals.css'

const poppins = Poppins({ weight: '800', subsets: ['latin', 'latin-ext'], variable: '--font-heading' })
const raleway = Raleway({ subsets: ['latin', 'latin-ext'], variable: '--font-body' })
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-code', weight: '400' })

const description = `A personal blog and portfolio by ${siteData.author}.`
const title = siteData.title

export const metadata: Metadata = fillMetadata({
  title,
  description,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(raleway.variable, poppins.variable, ubuntuMono.variable)}>
        {children}
        <footer>Last migrated to a new JS framework on Oct/2023, may I never have to do this again.</footer>
      </body>
      <Script src="https://analytics.eu.umami.is/script.js" data-website-id="905ba6d5-7711-4fd7-95d2-4d0260a6465c" />
    </html>
  )
}
