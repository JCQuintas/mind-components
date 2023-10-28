import { Navigation } from '../components/navigation'
import { PageHeader } from '../components/page-header'

export default function Home() {
  return (
    <>
      <PageHeader isRoot />
      <Navigation activePath="/" />

      <main className="">
        <button>Lets Go</button>

        <p>AAAA</p>
        <h1>AAAA</h1>

        <blockquote>
          <p>AAAA</p>
          <cite>AAAA</cite>
        </blockquote>
        <a href="https://google.com">AAAA</a>
      </main>
    </>
  )
}
