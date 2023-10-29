import { Metadata } from 'next'
import { siteData } from './site-data'

export const fillMetadata = ({
  title,
  description,
  openGraph,
  twitter,
  ...metadata
}: Omit<Metadata, 'title' | 'description'> & Record<'title' | 'description', string>): Metadata => {
  return {
    metadataBase: new URL(siteData.url),
    title,
    description,
    keywords: ['jose quintas', 'mindcomponents', 'blog', 'portfolio', 'curriculum'],
    robots: 'index, follow',
    authors: [
      {
        name: siteData.author,
      },
    ],
    ...metadata,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title,
      description,
      url: siteData.url,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...twitter,
    },
  }
}
