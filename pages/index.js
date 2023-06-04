import Banner from '@/components/Banner'
import NoSSR from 'react-no-ssr'
import { PageSEO } from '@/components/SEO'
import Snowfall from 'react-snowfall'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { renderCanvas } from '@/components/renderCanvas'
import siteMetadata from '@/data/siteMetadata'
import { useEffect } from 'react'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <NoSSR>
        <Snowfall color="#c4c3be" />
      </NoSSR>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      <Banner />
    </div>
  )
}
