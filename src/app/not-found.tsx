import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { siteData } from '../site-data'

export const metadata: Metadata = {
  title: `Not Found | ${siteData.title}`,
}

const NotFoundPage: FunctionComponent = () => {
  return (
    <div className="">
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
