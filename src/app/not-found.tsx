import { Metadata } from 'next'
import { FunctionComponent } from 'react'

export const metadata: Metadata = {
  title: '404: Not Found',
}

const NotFoundPage: FunctionComponent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
