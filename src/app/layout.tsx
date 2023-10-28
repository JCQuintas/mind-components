import type { Metadata } from 'next'
import { Poppins, Raleway } from 'next/font/google'
import 'normalize.css'
import './globals.css'

const poppins = Poppins({ weight: '800', subsets: ['latin', 'latin-ext'], variable: '--font-heading' })
const raleway = Raleway({ subsets: ['latin', 'latin-ext'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'MindComponents',
  description: 'A personal blog and portfolio by Jose Quintas.',
  keywords: ['jose quintas', 'mindcomponents', 'blog', 'portfolio', 'curriculum'],
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${poppins.variable}`}>
        {children}
        <footer>© {new Date().getFullYear()}, Built by Jose Quintas</footer>
      </body>
    </html>
  )
}
